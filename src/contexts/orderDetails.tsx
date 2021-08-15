import {
  useCallback,
  useEffect,
  FC,
  useState,
  createContext,
  useContext,
} from "react";

import { unitPrices } from "../constants";
import { IOptionsProps } from "../pages/entry/options";

export type TOptionType = IOptionsProps["optionType"];

interface IOrderDetails {
  scoops: Map<string, number>;
  toppings: Map<string, number>;
  totals: { scoops: number; toppings: number; grandTotal: number };
}

type IOrderDetailsContextValue = [
  IOrderDetails,
  (itemName: string, newItemCount: string, optionType: TOptionType) => void
];

export const OrderDetailsContext =
  createContext<IOrderDetailsContextValue | null>(null);

export const OrderDetailsProvider: FC = ({ children }) => {
  const [optionsCount, setOptionsCount] = useState({
    scoops: new Map<string, number>(),
    toppings: new Map<string, number>(),
  });

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  const calculateTotal = useCallback(
    (optionType: TOptionType, options: typeof optionsCount) => {
      let total = 0;
      for (const count of options[optionType].values()) {
        total += count * unitPrices[optionType];
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
    (itemName: string, newItemCount: string, optionType: TOptionType) => {
      const newOptionsCount = { ...optionsCount };
      const map = newOptionsCount[optionType];
      map.set(itemName, parseInt(newItemCount));
      setOptionsCount(newOptionsCount);
    },
    [optionsCount]
  );

  return (
    <OrderDetailsContext.Provider
      value={[{ ...optionsCount, totals }, updateOptionsCount]}
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
