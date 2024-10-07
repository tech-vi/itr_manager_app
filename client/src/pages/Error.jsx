import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { internal_server_error_500 } from "../assets/images";
import PropTypes from "prop-types";

const Error = ({ error }) => {
  return (
    <section>
      <Container className="h-100">
        <Row className="h-100 align-items-center justify-content-center">
          <Col sm={12} md={8} lg={6}>
            <Card className="py-5 px-3">
              <Image
                src={internal_server_error_500}
                alt="Internal Server Error"
                className="img-fluid mx-auto mb-2 w-75"
              />
              <h3 className="text-center fs-3 fw-bold mb-2">
                Something Went Wrong.!
              </h3>
              <p className="lead text-center mb-4">{error?.data?.message}</p>

              <div className="text-center">
                <Link replace to={"/"} className="btn btn-dark">
                  Go back to Home
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

Error.propTypes = {
  error: PropTypes.object,
};

export default Error;
