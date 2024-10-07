import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Stack } from "react-bootstrap";
import { AlertModal } from "../../modal";
import { useNavigate } from "react-router-dom";
import { useRemoveClientMutation } from "../../api/slices/clientAPI.js";
import { toast } from "react-toastify";

import { IoCopyOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { IoTrashOutline } from "react-icons/io5";

const RowActions = ({ data }) => {
  const [open, setOpen] = useState(false);

  const [removeClient, { isLoading, isSuccess, data: removedData, error }] =
    useRemoveClientMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(removedData?.message);
    } else {
      toast.error(error?.data.message);
    }
  }, [isSuccess, removedData, error]);

  const onCopy = (id) => {
    navigator.clipboard.writeText(id);
  };

  const onDelete = async () => {
    try {
      await removeClient(data._id).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div>
      <AlertModal
        isOpen={open}
        isLoading={isLoading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete this
            client!"
        closeLabel="Cancel"
        actionLabel="Delete"
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
          onClick={() => navigate(`/clients/${data._id}`)}
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
