import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

import { Item } from "./options";

const ScoopOption = ({
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
        alt={`${item.name} scoop`}
      />
      <Form.Group
        controlId={`${item.name}-count`}
        as={Row}
        style={{ marginTop: 10 }}
      >
        <Form.Label column xs={6} style={{ textAlign: "right" }}>
          {item.name}
        </Form.Label>
        <Col xs={5} style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue="0"
            onChange={(evt) => updateItemCount(evt.target.value)}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
