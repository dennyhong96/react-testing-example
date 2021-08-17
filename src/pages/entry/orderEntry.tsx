import { useEffect } from "react";
import Button from "react-bootstrap/Button";

import { OrderPhases } from "../../App";
import { useOrderDetails } from "../../contexts/orderDetails";
import { formatCurrency } from "../../utils";
import Options from "./options";

const OrderEntry = ({
  setOrderPhase,
}: {
  setOrderPhase: (newPhase: OrderPhases) => void;
}) => {
  const [{ totals, scoops }, , resetOrder] = useOrderDetails();

  useEffect(() => {
    resetOrder();
  }, [resetOrder]);

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total {formatCurrency(totals.grandTotal)}</h2>
      <Button
        variant="primary"
        onClick={() => setOrderPhase("reivew")}
        disabled={scoops.size < 1}
      >
        Order
      </Button>
    </div>
  );
};

export default OrderEntry;
