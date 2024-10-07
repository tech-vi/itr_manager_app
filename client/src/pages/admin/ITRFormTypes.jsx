import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { DataTable, Loader } from "../../components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomModal } from "../../modal/index.js";
import {
  useAddITRFormTypeMutation,
  useGetAllITRFormTypesQuery,
} from "../../api/slices/itrFormTypeAPI.js";

import { columns } from "../../components/itr_form_type/columns.jsx";
import { toast } from "react-toastify";
import { Error } from "../index.js";

const ITRFormTypes = () => {
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
  } = useGetAllITRFormTypesQuery();

  const [
    addITRFormType,
    {
      isLoading: isAddItrFtLoading,
      isSuccess: isAddItrFtSuccess,
      data: addItrFtData,
      error: addItrFtError,
    },
  ] = useAddITRFormTypeMutation();

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
      label: "Add",
      variant: "dark",
    },
  ];

  useEffect(() => {
    if (isAddItrFtSuccess) {
      toast.success(addItrFtData?.message);
      reset();
      closeModal();
    } else {
      toast.error(addItrFtError?.data.message);
      reset();
      closeModal();
    }
  }, [isAddItrFtSuccess, addItrFtData, addItrFtError, reset]);

  // # Add or Edit Title

  const onSubmit = async (data) => {
    try {
      await addITRFormType(data).unwrap();
      closeModal();
    } catch (error) {
      console.error("Error submitting ITR form type:", error);
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
        modalTitle="Add ITR Form Type"
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
              <h4>ITR Form Types</h4>
              <Button
                variant="dark"
                onClick={showModal}
                disabled={isAddItrFtLoading}
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

export default ITRFormTypes;
