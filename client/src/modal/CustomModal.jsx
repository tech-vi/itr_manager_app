import { Modal, Button, Form, Stack } from "react-bootstrap";
import PropTypes from "prop-types";

const CustomModal = ({
  show,
  onClose,
  modalTitle,
  modalBody,
  modalButtonsConfig,
  handleSubmit,
  onSubmit,
  formState,
}) => {
  const handleButtonClick = (button) => {
    if (button.label === "Close") {
      button.onClick ? button.onClick() : onClose();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title as={"h5"}>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <div>{modalBody}</div>
              <div className="d-flex justify-content-end gap-3 mt-4">
                {modalButtonsConfig.map((button, index) => (
                  <Button
                    key={index}
                    variant={button.variant || "dark"}
                    onClick={() => handleButtonClick(button)}
                    type={button.label === "Close" ? "button" : "submit"}
                  >
                    {button.label}
                  </Button>
                ))}
              </div>
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

CustomModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  modalTitle: PropTypes.string,
  modalBody: PropTypes.node,
  modalButtonsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      variant: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  formState: PropTypes.object,
};

export default CustomModal;
