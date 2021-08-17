import { OrderPhases } from "../../App";
import SummaryForm from "./summaryForm";

const OrderSummary = ({
  setOrderPhase,
}: {
  setOrderPhase: (newPhase: OrderPhases) => void;
}) => {
  return (
    <div>
      <h1>Order Summary</h1>
      <SummaryForm onConfirm={() => setOrderPhase("complete")} />
    </div>
  );
};

export default OrderSummary;
