import { OrderPhases } from "../../App";
import { useOrderDetails } from "../../contexts/orderDetails";
import { formatCurrency } from "../../utils";
import SummaryForm from "./summaryForm";

const OrderSummary = ({
  setOrderPhase,
}: {
  setOrderPhase: (newPhase: OrderPhases) => void;
}) => {
  const [{ scoops, toppings, totals }] = useOrderDetails();

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>
        {[...scoops.entries()].map(([scoop, count]) => (
          <li key={scoop}>
            {count} x {scoop}
          </li>
        ))}
      </ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>
        {[...toppings.keys()].map((topping) => (
          <li key={topping}>{topping}</li>
        ))}
      </ul>
      <h2>Total: {formatCurrency(totals.grandTotal)}</h2>
      <SummaryForm onConfirm={() => setOrderPhase("complete")} />
    </div>
  );
};

export default OrderSummary;
