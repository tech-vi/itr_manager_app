import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const TextInput = forwardRef(
  ({ id, label, type, placeHolder, error, ...rest }, ref) => {
    return (
      <>
        <Form.Group controlId={id}>
          <Form.Label>{label}</Form.Label>
          <Form.Control
            ref={ref}
            type={type}
            placeholder={placeHolder}
            isInvalid={!!error}
            {...rest}
          />
          {error && (
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </>
    );
  }
);

TextInput.displayName = "TextInput";

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeHolder: PropTypes.string,
  error: PropTypes.string,
};

export default TextInput;
