import { FC } from "react";
import Container from "react-bootstrap/Container";

import { OrderDetailsProvider } from "./contexts/orderDetails";
import OrderEntry from "./pages/entry/orderEntry";
import "./App.css";

const App: FC = () => {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
};

export default App;
