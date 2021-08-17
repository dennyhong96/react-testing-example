import { FC, useState } from "react";
import Container from "react-bootstrap/Container";

import { OrderDetailsProvider } from "./contexts/orderDetails";
import OrderEntry from "./pages/entry/orderEntry";
import OrderSummary from "./pages/summary/orderSummary";
import OrderConfirmation from "./pages/orderConfirmation";

import "./App.css";

export type OrderPhases = "inProgress" | "reivew" | "complete";

const App: FC = () => {
  const [orderPhase, setOrderPhase] = useState<OrderPhases>("inProgress");

  return (
    <Container>
      <OrderDetailsProvider>
        {orderPhase === "inProgress" && (
          <OrderEntry setOrderPhase={setOrderPhase} />
        )}
        {orderPhase === "reivew" && (
          <OrderSummary setOrderPhase={setOrderPhase} />
        )}
        {orderPhase === "complete" && (
          <OrderConfirmation setOrderPhase={setOrderPhase} />
        )}
      </OrderDetailsProvider>
    </Container>
  );
};

export default App;
