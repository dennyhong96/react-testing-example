import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

import { useOrderDetails } from "../../contexts/orderDetails";
import { OrderPhases } from "../../App";

const OrderConfirmation = ({
  setOrderPhase,
}: {
  setOrderPhase: (newPhase: OrderPhases) => void;
}) => {
  const [details] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState<number | undefined>();

  useEffect(() => {
    axios
      .post("http://localhost:3030/order", details)
      .then((res) => setOrderNumber(res.data.orderNumber));
  }, [details]);

  return orderNumber ? (
    <div>
      <h1>Thank You!</h1>
      <p>Your order number is {orderNumber}</p>
      <p>as per terms and conditions, nothing will happen now</p>
      <Button variant="primary" onClick={() => setOrderPhase("inProgress")}>
        Create new order
      </Button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default OrderConfirmation;
