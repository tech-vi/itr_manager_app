import { Col, Container, Row, Stack } from "react-bootstrap";
import { DataTable, Loader } from "../../components";

import { columns } from "../../components/users/columns.jsx";

import { useGetAllUsersQuery } from "../../api/slices/userAPI.js";
import { Error } from "../index.js";

const Users = () => {
  const { data: allData, isLoading, isError, error } = useGetAllUsersQuery();

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
              <h4>Staff Details</h4>
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

export default Users;
