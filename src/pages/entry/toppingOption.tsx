import Col from "react-bootstrap/Col";

import { Item } from "./options";

const ToppingOption = ({ item }: { item: Item }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${item.imagePath}`}
        alt={`${item.name} topping`}
      />
    </Col>
  );
};

export default ToppingOption;
