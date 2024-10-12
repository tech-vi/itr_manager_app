import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { DataTable, Loader } from "../../components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomModal } from "../../modal";
import {
  useAddFeeStatusMutation,
  useGetAllFeeStatusesQuery,
} from "../../api/slices/feeStatusAPI.js";
import { columns } from "../../components/fee_status/columns.jsx";
import { toast } from "react-toastify";
import { Error } from "../index.js";

const FeeStatuses = () => {
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  // # RHF and zod

  const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required!" }),
  });

  const form = useForm({
    defaultValues: { title: "" },
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, register, formState, reset } = form;

  // # RTK Queries

  const {
    data: allData,
    isLoading,
    isError,
    error,
  } = useGetAllFeeStatusesQuery();

  const [
    addFeeStatus,
    {
      isLoading: isAddFsLoading,
      isSuccess: isAddFsSuccess,
      data: addFsData,
      error: addFsError,
    },
  ] = useAddFeeStatusMutation();

  const modalBody = (
    <>
      <Form.Group controlId={"feeStatus"}>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Fee Status"
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
      label: "Add",
      variant: "dark",
    },
  ];

  useEffect(() => {
    if (isAddFsSuccess) {
      toast.success(addFsData?.message);
      reset();
      closeModal();
    } else {
      toast.error(addFsError?.data.message);
      reset();
      closeModal();
    }
  }, [isAddFsSuccess, addFsData, addFsError, reset]);

  // # Add or Edit Title

  const onSubmit = async (data) => {
    try {
      await addFeeStatus(data).unwrap();
      closeModal();
    } catch (error) {
      // console.error("Error submitting fee status:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <>
      <CustomModal
        show={show}
        onClose={closeModal}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        modalTitle="Add Fee Status"
        modalBody={modalBody}
        modalButtonsConfig={modalButtonsConfig}
        formState={formState}
      />
      <Container>
        <Row>
          <Col className="mb-3">
            <Stack
              direction="horizontal"
              className="justify-content-between align-items-center"
            >
              <h4>Fee Statuses</h4>
              <Button
                variant="dark"
                onClick={showModal}
                disabled={isAddFsLoading}
              >
                Add
              </Button>
            </Stack>
          </Col>
        </Row>
        <Row>
          <Col>
            <Stack className="mt-3">
              <DataTable
                data={allData || []}
                columns={columns}
                canDownload={false}
              />
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FeeStatuses;
