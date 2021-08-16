import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

import { Item } from "./options";

const ToppingOption = ({
  item,
  updateItemCount,
}: {
  item: Item;
  updateItemCount: (newItemCount: string) => void;
}) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${item.imagePath}`}
        alt={`${item.name} topping`}
      />
      <Form.Group
        controlId={`${item.name}-topping-checkbox`}
        as={Row}
        style={{ marginTop: 10 }}
      >
        <Form.Check
          type="checkbox"
          label={item.name}
          onChange={(evt) => updateItemCount(evt.target.checked ? "1" : "0")}
        />
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
