import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { DataTable, Loader } from "../../components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomModal } from "../../modal/index.js";
import {
  useAddITRFormStatusMutation,
  useGetAllITRFormStatusesQuery,
} from "../../api/slices/itrFormStatusAPI.js";

import { columns } from "../../components/itr_form_status/columns.jsx";
import { toast } from "react-toastify";
import { Error } from "../index.js";

const ITRFormStatuses = () => {
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
  } = useGetAllITRFormStatusesQuery();

  const [
    addITRFormStatus,
    {
      isLoading: isAddItrFsLoading,
      isSuccess: isAddItrFsSuccess,
      data: addItrFsData,
      error: addItrFsError,
    },
  ] = useAddITRFormStatusMutation();

  const modalBody = (
    <>
      <Form.Group controlId={"itrFormStatus"}>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="ITR Form Status"
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
    if (isAddItrFsSuccess) {
      toast.success(addItrFsData?.message);
      reset();
      closeModal();
    } else {
      toast.error(addItrFsError?.data.message);
      reset();
      closeModal();
    }
  }, [isAddItrFsSuccess, addItrFsData, addItrFsError, reset]);

  // # Add or Edit Title

  const onSubmit = async (data) => {
    try {
      await addITRFormStatus(data).unwrap();
      closeModal();
    } catch (error) {
      // console.error("Error submitting ITR form status:", error);
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
        modalTitle="Add ITR Form Status"
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
              <h4>ITR Form Statuses</h4>
              <Button
                variant="dark"
                onClick={showModal}
                disabled={isAddItrFsLoading}
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

export default ITRFormStatuses;
