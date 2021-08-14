import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SummaryForm = () => {
  const [checked, setChecked] = useState(false);

  const checkboxLabel = (
    <span style={{ color: "blue" }}>
      I agree to <span>Terms and Conditions</span>
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
