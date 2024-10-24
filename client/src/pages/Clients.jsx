import { Col, Container, Row, Stack } from "react-bootstrap";
import { DataTable, Loader } from "../components";
import { useGetAllClientsQuery } from "../api/slices/clientAPI";
import { Link } from "react-router-dom";
import { Error } from "./index.js";
import { useGetAllFinancialYearsQuery } from "../api/slices/financialYearAPI.js";
import { useGetAllITRFormTypesQuery } from "../api/slices/itrFormTypeAPI.js";
import { useGetAllITRFormStatusesQuery } from "../api/slices/itrFormStatusAPI.js";
import { useGetAllFeeStatusesQuery } from "../api/slices/feeStatusAPI.js";
import { generateColumns } from "../components/clients/columns.jsx";
import { useMemo } from "react";

const Clients = () => {
  // const { data: clientsData, isLoading, isError, error } = useGetAllClientsQuery();
  // const { data: financialYearData } = useGetAllFinancialYearsQuery();
  // const { data: itrFormTypeData } = useGetAllITRFormTypesQuery();
  // const { data: itrFormStatusData } = useGetAllITRFormStatusesQuery();
  // const { data: feeStatusData } = useGetAllFeeStatusesQuery();

  const {
    data: clientsData,
    isLoading: isClientsLoading,
    isError: isClientsError,
    error: clientsError,
  } = useGetAllClientsQuery();
  const {
    data: financialYearData,
    isLoading: isFinancialYearsLoading,
    isError: isFinancialYearsError,
    error: financialYearsError,
  } = useGetAllFinancialYearsQuery();
  const {
    data: itrFormTypeData,
    isLoading: isItrFormTypesLoading,
    isError: isItrFormTypesError,
    error: itrFormTypesError,
  } = useGetAllITRFormTypesQuery();
  const {
    data: itrFormStatusData,
    isLoading: isItrFormStatusesLoading,
    isError: isItrFormStatusesError,
    error: itrFormStatusesError,
  } = useGetAllITRFormStatusesQuery();
  const {
    data: feeStatusData,
    isLoading: isFeeStatusesLoading,
    isError: isFeeStatusesError,
    error: feeStatusesError,
  } = useGetAllFeeStatusesQuery();

  // Combine all loading states
  const isLoading =
    isClientsLoading ||
    isFinancialYearsLoading ||
    isItrFormTypesLoading ||
    isItrFormStatusesLoading ||
    isFeeStatusesLoading;

  // Combine all error states
  const isError =
    isClientsError ||
    isFinancialYearsError ||
    isItrFormTypesError ||
    isItrFormStatusesError ||
    isFeeStatusesError;

  // Extract the first error to display if any
  const error =
    clientsError ||
    financialYearsError ||
    itrFormTypesError ||
    itrFormStatusesError ||
    feeStatusesError;

  const columns = useMemo(
    () =>
      generateColumns({
        financialYearData,
        itrFormTypeData,
        itrFormStatusData,
        feeStatusData,
      }),
    [financialYearData, itrFormTypeData, itrFormStatusData, feeStatusData]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <>
      <Container>
        <Row>
          <Col className="mb-3">
            <Stack
              direction="horizontal"
              className="justify-content-between align-items-center"
            >
              <h4>Client Details</h4>
              <Link className="btn btn-dark" to={"/clients/add"}>
                Add Client
              </Link>
            </Stack>
          </Col>
        </Row>
        <Row>
          <Col>
            <Stack className="mt-3">
              <DataTable
                data={clientsData || []}
                columns={columns}
                isClient={true}
              />
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Clients;
