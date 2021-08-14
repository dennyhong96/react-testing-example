import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const SummaryForm = () => {
  const [checked, setChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice scream will acutally be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span style={{ color: "blue" }}>
      I agree to{" "}
      <OverlayTrigger placement="auto" overlay={popover}>
        <span>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={checked}
          label={checkboxLabel}
          onChange={(evt) => setChecked(evt.target.checked)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!checked}>
        Confirm Order
      </Button>
    </Form>
  );
};

export default SummaryForm;
