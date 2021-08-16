import { useOrderDetails } from "../../contexts/orderDetails";
import Options, { formatCurrency } from "./options";

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
