import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import {
  useRemoveUserMutation,
  useUpdateUserRoleMutation,
} from "../../api/slices/userAPI.js";
import { AlertModal, CustomModal } from "../../modal/index.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoCopyOutline, IoTrashOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";

const RowActions = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [removeUser] = useRemoveUserMutation();

  const onCopy = (id) => {
    navigator.clipboard.writeText(id);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await removeUser(data._id).unwrap();
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
    isAdmin: z.boolean(),
  });

  const form = useForm({
    defaultValues: { isAdmin: data.isAdmin || false },
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, register, formState } = form;

  const modalBody = (
    <div>
      <Form.Group controlId={"feeStatus"} className="mx-5">
        <Form.Label>Role</Form.Label>
        <Form.Check type="checkbox" label={"Admin"} {...register("isAdmin")} />
      </Form.Group>
    </div>
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
      const response = await updateUserRole({
        id: data._id,
        isAdmin: editedData.isAdmin,
      }).unwrap();
      // console.log(response);
      closeModal();
    } catch (error) {
      // console.error("Error updating role:", error);
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
        description="This action cannot be undone. This will permanently delete this user/staff.!"
        closeLabel="Cancel"
        actionLabel="Delete"
      />
      <CustomModal
        show={show}
        onClose={closeModal}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        modalTitle="Edit Role"
        modalBody={modalBody}
        modalButtonsConfig={modalButtonsConfig}
        formState={formState}
      />

      <Stack direction="horizontal" gap={1}>
        <Button
          variant="light"
          size="sm"
          title="Copy ID"
          onClick={() => onCopy(data._id)}
        >
          <IoCopyOutline style={{ fontSize: "20px" }} />
        </Button>
        <Button
          variant="light"
          size="sm"
          title="Edit"
          onClick={() => onEdit(data)}
        >
          <LiaEdit style={{ fontSize: "20px" }} />
        </Button>
        <Button
          variant="light"
          size="sm"
          title="Delete"
          onClick={() => setOpen(true)}
        >
          <IoTrashOutline style={{ fontSize: "20px" }} />
        </Button>
      </Stack>
    </div>
  );
};

RowActions.propTypes = {
  data: PropTypes.object,
};

export default RowActions;
