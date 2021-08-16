import { useOrderDetails } from "../../contexts/orderDetails";
import { formatCurrency } from "../../utils";
import Options from "./options";

const OrderEntry = () => {
  const [{ totals }] = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total {formatCurrency(totals.grandTotal)}</h2>
    </div>
  );
};

export default OrderEntry;
