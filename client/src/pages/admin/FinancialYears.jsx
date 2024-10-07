import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { DataTable, Loader } from "../../components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomModal } from "../../modal/index.js";
import {
  useAddFinancialYearMutation,
  useGetAllFinancialYearsQuery,
} from "../../api/slices/financialYearAPI.js";
import { columns } from "../../components/financial_year/columns.jsx";
import { toast } from "react-toastify";
import { Error } from "../index.js";

const FinancialYears = () => {
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  // # RHF and zod

  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: "Title is required!" })
      .regex(/^20\d{2}-20\d{2}$/, {
        message: "Financial year must follow the '20xx-20xx' pattern.!",
      })
      .refine(
        (value) => {
          const years = value.split("-");
          const startYear = parseInt(years[0], 10);
          const endYear = parseInt(years[1], 10);
          return endYear === startYear + 1;
        },
        {
          message: "Invalid financial year.!",
        }
      ),
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
  } = useGetAllFinancialYearsQuery();

  const [
    addFinancialYear,
    {
      isLoading: isAddFyLoading,
      isSuccess: isAddFySuccess,
      data: addFyData,
      error: addFyError,
    },
  ] = useAddFinancialYearMutation();

  const modalBody = (
    <>
      <Form.Group controlId={"financialYear"}>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Financial Year"
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
    if (isAddFySuccess) {
      toast.success(addFyData?.message);
      reset();
      closeModal();
    } else {
      toast.error(addFyError?.data.message);
      reset();
      closeModal();
    }
  }, [isAddFySuccess, addFyData, addFyError, reset]);

  // # Add or Edit Title

  const onSubmit = async (data) => {
    try {
      await addFinancialYear(data).unwrap();
      closeModal();
    } catch (error) {
      console.error("Error submitting financial year:", error);
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
        modalTitle="Add Financial Year"
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
              <h4>Financial Years</h4>
              <Button
                variant="dark"
                onClick={showModal}
                disabled={isAddFyLoading}
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

export default FinancialYears;
