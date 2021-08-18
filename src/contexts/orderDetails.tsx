import {
  useCallback,
  useEffect,
  FC,
  useState,
  createContext,
  useContext,
} from "react";

import { unitPrices } from "../constants";
import { scoops, toppings } from "../mocks/handlers";
import { IOptionsProps } from "../pages/entry/options";

export type TOptionType = IOptionsProps["optionType"];

const ScoopNames = scoops.map((s) => s.name);
const ToppingNames = toppings.map((s) => s.name);
export type TItemNames =
  | typeof ScoopNames[number]
  | typeof ToppingNames[number];

interface IOrderDetails {
  scoops: Map<TItemNames, number>;
  toppings: Map<string, number>;
  totals: { scoops: number; toppings: number; grandTotal: number };
}

type IOrderDetailsContextValue = [
  IOrderDetails,
  (itemName: TItemNames, newItemCount: string, optionType: TOptionType) => void,
  () => void
];

export const OrderDetailsContext =
  createContext<IOrderDetailsContextValue | null>(null);

const INITIAL_COUNT_STATE = {
  scoops: new Map<TItemNames, number>(),
  toppings: new Map<TItemNames, number>(),
};

const INITIAL_TOTAL_STATE = {
  scoops: 0,
  toppings: 0,
  grandTotal: 0,
};

export const OrderDetailsProvider: FC = ({ children }) => {
  const [optionsCount, setOptionsCount] = useState(INITIAL_COUNT_STATE);
  const [totals, setTotals] = useState(INITIAL_TOTAL_STATE);

  const calculateTotal = useCallback(
    (optionType: TOptionType, options: typeof optionsCount) => {
      let total = 0;
      for (const count of options[optionType].values()) {
        total += (isFinite(count) ? count : 0) * unitPrices[optionType];
      }
      return total;
    },
    []
  );

  useEffect(() => {
    const scoopsSubtotal = calculateTotal("scoops", optionsCount);
    const toppingsSubtotal = calculateTotal("toppings", optionsCount);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal,
    });
  }, [optionsCount, calculateTotal]);

  const updateOptionsCount = useCallback(
    (itemName: TItemNames, newItemCount: string, optionType: TOptionType) => {
      const isValidCount =
        Number.isFinite(Number(newItemCount)) &&
        Number.isInteger(Number(newItemCount)) &&
        Number(Number(newItemCount)) >= 0 &&
        Number(Number(newItemCount)) <= 10;

      if (!isValidCount) return;

      const { [optionType]: optionMap } = optionsCount;

      const newOptionMap = new Map(optionMap); // Create a new map copy, avoid mutating old map
      if (Number(newItemCount) === 0) {
        newOptionMap.delete(itemName);
      } else {
        newOptionMap.set(itemName, Number(newItemCount));
      }

      const newOptionsCount = { ...optionsCount };
      newOptionsCount[optionType] = newOptionMap;

      setOptionsCount(newOptionsCount);
    },
    [optionsCount]
  );

  const resetOrder = useCallback(() => {
    setOptionsCount(INITIAL_COUNT_STATE);
  }, []);

  return (
    <OrderDetailsContext.Provider
      value={[{ ...optionsCount, totals }, updateOptionsCount, resetOrder]}
    >
      {children}
    </OrderDetailsContext.Provider>
  );
};

export const useOrderDetails = () => {
  const context = useContext(OrderDetailsContext);

  if (!context)
    throw new Error(
      "useOrderDetails must be used within the OrderDetailsContext Provider"
    );

  return context;
};
