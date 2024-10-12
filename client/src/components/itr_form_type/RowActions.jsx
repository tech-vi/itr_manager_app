import PropTypes from "prop-types";
import { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import {
  useRemoveITRFormTypeMutation,
  useEditITRFormTypeMutation,
} from "../../api/slices/itrFormTypeAPI.js";
import { AlertModal, CustomModal } from "../../modal/index.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RowActions = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editITRFormType] = useEditITRFormTypeMutation();
  const [removeITRFormType] = useRemoveITRFormTypeMutation();

  const onCopy = (id) => {
    navigator.clipboard.writeText(id);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await removeITRFormType(data._id).unwrap();
      // console.log(response);
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // # edit title

  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);

  // # RHF and zod

  const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required!" }),
  });

  const form = useForm({
    defaultValues: { title: data.title || "" },
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, register, formState } = form;

  const modalBody = (
    <>
      <Form.Group controlId={"itrFormType"}>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="ITR Form Type"
          isInvalid={!!formState.errors.title?.message}
          {...register("title")}
        />
        {formState.errors.title?.message && (
          <Form.Control.Feedback type="invalid">
            {formState.errors.title?.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </>
  );

  const modalButtonsConfig = [
    { label: "Close", variant: "outline-secondary", onClick: closeModal },
    {
      label: "Edit",
      variant: "dark",
    },
  ];

  const onEdit = (data) => {
    setShow(true);
    // console.log(data);
  };

  const onSubmit = async (editedData) => {
    // console.log(editedData);
    try {
      const response = await editITRFormType({
        id: data._id,
        title: editedData.title,
      }).unwrap();
      // console.log(response);
      closeModal();
    } catch (error) {
      // console.error("Error updating itr form type:", error);
    }
  };

  return (
    <div>
      <AlertModal
        isOpen={open}
        isLoading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete this
            itr form type!"
        closeLabel="Cancel"
        actionLabel="Delete"
      />
      <CustomModal
        show={show}
        onClose={closeModal}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        modalTitle="Edit ITR Form Type"
        modalBody={modalBody}
        modalButtonsConfig={modalButtonsConfig}
        formState={formState}
      />
      <Dropdown>
        <Dropdown.Toggle
          variant="light"
          id="row-actions-menu"
          className="row-actions-menu"
          style={{ border: "none", outline: "none", background: "unset" }}
        >
          <BsThreeDots />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={"button"} onClick={() => onCopy(data._id)}>
            Copy ID
          </Dropdown.Item>
          <Dropdown.Item as={"button"} onClick={() => onEdit(data)}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item as={"button"} onClick={() => setOpen(true)}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

RowActions.propTypes = {
  data: PropTypes.object,
};

export default RowActions;
