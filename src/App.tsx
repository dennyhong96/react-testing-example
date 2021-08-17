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

  let PhaseComponent;
  switch (orderPhase) {
    case "inProgress": {
      PhaseComponent = OrderEntry;
      break;
    }
    case "reivew": {
      PhaseComponent = OrderSummary;
      break;
    }
    case "complete": {
      PhaseComponent = OrderConfirmation;
      break;
    }
    default: {
      PhaseComponent = OrderEntry;
      break;
    }
  }

  return (
    <OrderDetailsProvider>
      <Container>
        <PhaseComponent setOrderPhase={setOrderPhase} />
      </Container>
    </OrderDetailsProvider>
  );
};

export default App;
