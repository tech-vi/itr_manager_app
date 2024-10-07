import { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { useGetAllFeeStatusesQuery } from "../api/slices/feeStatusAPI.js";
import { useGetAllFinancialYearsQuery } from "../api/slices/financialYearAPI.js";
import { useGetAllITRFormStatusesQuery } from "../api/slices/itrFormStatusAPI.js";
import { useGetAllITRFormTypesQuery } from "../api/slices/itrFormTypeAPI.js";

import {
  useAddClientMutation,
  useEditClientMutation,
  useGetClientQuery,
} from "../api/slices/clientAPI.js";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const ClientForm = () => {
  const { cid } = useParams();

  const { data: feeStatusData } = useGetAllFeeStatusesQuery();
  const { data: financialYearData } = useGetAllFinancialYearsQuery();
  const { data: itrFormStatusData } = useGetAllITRFormStatusesQuery();
  const { data: itrFormTypeData } = useGetAllITRFormTypesQuery();

  const { data: clientData } = useGetClientQuery(cid);

  const [assessmentYear, setAssessmentYear] = useState("");

  const navigate = useNavigate();

  const formSchema = z.object({
    pan_number: z
      .string()
      .min(1, { message: "PAN number is required.!" })
      .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
        message: "Invalid PAN number format.!",
      }),

    client_name: z
      .string()
      .min(1, { message: "Client name is required.!" })
      .min(3, { message: "Client name must be at least 3 characters long.!" }),

    mobile_number: z
      .string()
      .min(1, { message: "Mobile number is required.!" })
      .regex(/^\d{10}$/, {
        message: "Mobile number must be a valid 10-digit number.!",
      }),

    password: z.string().min(1, { message: "Password is required.!" }),

    itr_form_type: z
      .string()
      .min(1, { message: "ITR Form Type is required.!" }),

    itr_form_status: z
      .string()
      .min(1, { message: "ITR Form Status is required.!" }),

    fee_status: z.string().min(1, { message: "Fee Status is required.!" }),

    financial_year: z
      .string()
      .min(1, { message: "Financial Year is required.!" }),

    assessment_year: z.string(),
    // .min(1, { message: "Assessment Year is required.!" }),

    revised: z.boolean().optional(),

    added_by: z.string().optional(),
    edited_by: z.string().optional(),
  });

  const form = useForm({
    defaultValues: clientData || {
      pan_number: "",
      client_name: "",
      mobile_number: "",
      password: "",
      itr_form_type: "",
      itr_form_status: "",
      fee_status: "",
      financial_year: "",
      assessment_year: "",
      revised: false,
    },
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    register,
    formState: { errors },
  } = form;

  // console.log("RHF errors : ", errors);

  useEffect(() => {
    if (cid && clientData) {
      reset({
        pan_number: clientData.pan_number,
        client_name: clientData.client_name,
        mobile_number: clientData.mobile_number,
        password: clientData.password,
        itr_form_type: clientData.itr_form_type,
        itr_form_status: clientData.itr_form_status,
        fee_status: clientData.fee_status,
        financial_year: clientData.financial_year,
        assessment_year: clientData.assessment_year,
        revised: clientData.revised,
      });
    }
  }, [cid, clientData, reset]);

  const [
    addClient,
    {
      isLoading: isAddLoading,
      isSuccess: isAddSuccess,
      data: addData,
      error: addError,
    },
  ] = useAddClientMutation();

  // console.log("Adding Client : ", { isLoading, isSuccess, data, error });

  const [
    editClient,
    {
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      data: editData,
      error: editError,
    },
  ] = useEditClientMutation();

  // console.log("Editing Client : ", {
  //   isEditLoading,
  //   isEditSuccess,
  //   editData,
  //   editError,
  // });

  const title = cid ? "Edit Client Details" : "Add Client Details";
  const action = cid ? "Update" : "Add";
  const processing = cid ? "Updating" : "Adding";

  const handleFinancialYearChange = (event) => {
    const selectedId = event.target.value;

    setValue("financial_year", selectedId, { shouldValidate: true });

    const selectedYearObj = financialYearData.find(
      (year) => year._id === selectedId
    );

    if (selectedYearObj && selectedYearObj.title) {
      const years = selectedYearObj.title.split("-");
      const startYear = parseInt(years[0], 10) + 1;
      const endYear = parseInt(years[1], 10) + 1;

      const newAssessmentYear = `${startYear}-${endYear}`;

      setAssessmentYear(newAssessmentYear);
      setValue("assessment_year", newAssessmentYear);
    } else {
      setAssessmentYear("");
      setValue("assessment_year", "");
    }
  };

  useEffect(() => {
    if (isAddSuccess) {
      toast.success(addData?.message);
      reset();
      navigate("/clients", { replace: true });
    } else {
      toast.error(addError?.data.message);
    }
  }, [isAddSuccess, addData, addError, reset, navigate]);

  useEffect(() => {
    if (isEditSuccess) {
      toast.success(editData?.message);
      reset();
      navigate("/clients", { replace: true });
    } else {
      toast.error(editError?.data.message);
    }
  }, [isEditSuccess, editData, editError, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      if (cid) {
        await editClient({ id: cid, ...data }).unwrap();
      } else {
        await addClient(data).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} lg={10} className="mb-3">
            <h4 className="mb-4">{title}</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col xs={12} md={6} lg={4}>
                  <Form.Group className="mb-3" controlId="pan_number">
                    <Form.Label>Pan Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="PAN"
                      {...register("pan_number")}
                      isInvalid={!!errors.pan_number}
                    />
                    {errors.pan_number?.message && (
                      <Form.Control.Feedback type="invalid">
                        {errors.pan_number?.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Form.Group className="mb-3" controlId="client_name">
                    <Form.Label>Name as per PAN</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      {...register("client_name")}
                      isInvalid={!!errors.client_name}
                    />
                    {errors.client_name?.message && (
                      <Form.Control.Feedback type="invalid">
                        {errors.client_name?.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Form.Group className="mb-3" controlId="mobile_number">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Mobile"
                      {...register("mobile_number")}
                      isInvalid={!!errors.mobile_number}
                    />
                    {errors.mobile_number?.message && (
                      <Form.Control.Feedback type="invalid">
                        {errors.mobile_number?.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Password"
                      {...register("password")}
                      isInvalid={!!errors.password}
                    />
                    {errors.password?.message && (
                      <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Form.Group className="mb-3" controlId="itr_form">
                    <Form.Label>ITR Form</Form.Label>
                    <Form.Select
                      aria-label="Select ITR Form"
                      {...register("itr_form_type")}
                      isInvalid={!!errors.itr_form_type}
                    >
                      <option value="">Select ITR Form</option>
                      {itrFormTypeData?.length &&
                        itrFormTypeData?.map((itrFormType) => (
                          <option key={itrFormType._id} value={itrFormType._id}>
                            {itrFormType.title}
                          </option>
                        ))}
                    </Form.Select>
                    {errors.itr_form_type?.message && (
                      <Form.Control.Feedback type="invalid">
                        {errors.itr_form_type?.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Form.Group className="mb-3" controlId="itr_status">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      aria-label="Select Status"
                      {...register("itr_form_status")}
                      isInvalid={!!errors.itr_form_status}
                    >
                      <option value="">Select Status</option>
                      {itrFormStatusData?.length &&
                        itrFormStatusData?.map((itrFormStatus) => (
                          <option
                            key={itrFormStatus._id}
                            value={itrFormStatus._id}
                          >
                            {itrFormStatus.title}
                          </option>
                        ))}
                    </Form.Select>
                    {errors.itr_form_status?.message && (
                      <Form.Control.Feedback type="invalid">
                        {errors.itr_form_status?.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Form.Group className="mb-3" controlId="financial_year">
                    <Form.Label>Financial Year</Form.Label>
                    <Form.Select
                      aria-label="Select Financial Year"
                      {...register("financial_year")}
                      isInvalid={!!errors.financial_year}
                      onChange={handleFinancialYearChange}
                    >
                      <option value="">Select Financial Year</option>
                      {financialYearData?.length &&
                        financialYearData?.map((financialYear) => (
                          <option
                            key={financialYear._id}
                            value={financialYear._id}
                          >
                            {financialYear.title}
                          </option>
                        ))}
                    </Form.Select>
                    {errors.financial_year?.message && (
                      <Form.Control.Feedback type="invalid">
                        {errors.financial_year?.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Form.Group className="mb-3" controlId="assessment_year">
                    <Form.Label>Assessment Year</Form.Label>
                    <Form.Control
                      type="text"
                      value={assessmentYear}
                      readOnly
                      placeholder="Assessment Year"
                      {...register("assessment_year")}
                      isInvalid={!!errors.assessment_year}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Form.Group className="mb-3" controlId="fee_status">
                    <Form.Label>Fee Status</Form.Label>
                    <Form.Select
                      aria-label="Select Fee Status"
                      {...register("fee_status")}
                      isInvalid={!!errors.fee_status}
                    >
                      <option value="">Select Fee Status</option>
                      {feeStatusData?.length &&
                        feeStatusData?.map((feeStatus) => (
                          <option key={feeStatus._id} value={feeStatus._id}>
                            {feeStatus.title}
                          </option>
                        ))}
                    </Form.Select>
                    {errors.fee_status?.message && (
                      <Form.Control.Feedback type="invalid">
                        {errors.fee_status?.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Col>
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  className={cid ? "d-block" : "d-none"}
                >
                  <Form.Group className="mb-3" controlId="itr_form_mode">
                    <Form.Label>ITR Form Mode</Form.Label>
                    <Form.Check
                      type={"checkbox"}
                      label="Revised"
                      {...register("revised")}
                      isInvalid={!!errors.revised}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3 mt-md-5 justify-content-end gap-4 gap-md-1">
                <Col xs={12} md={4} lg={3} className="order-md-1">
                  <Button
                    variant="dark"
                    type="submit"
                    className="w-100"
                    disabled={isAddLoading || isEditLoading}
                  >
                    {isAddLoading || isEditLoading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        <span>{processing}</span>
                      </>
                    ) : (
                      <span>{action}</span>
                    )}
                  </Button>
                </Col>
                <Col xs={12} md={4} lg={3} className="order-md-0">
                  <Link
                    to={"/clients"}
                    className="btn btn-outline-secondary w-100"
                  >
                    Cancel
                  </Link>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <DevTool control={control} />
    </>
  );
};

export default ClientForm;
