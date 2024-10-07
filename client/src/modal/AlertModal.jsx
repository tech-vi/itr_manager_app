import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title,
  description,
  closeLabel,
  actionLabel,
}) => {
  return (
    <div>
      <Modal
        show={isOpen}
        onHide={onClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer className="gap-3">
          <Button variant="outline-secondary" onClick={onClose}>
            {closeLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
            {actionLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

AlertModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  closeLabel: PropTypes.string,
  actionLabel: PropTypes.string,
};

export default AlertModal;
