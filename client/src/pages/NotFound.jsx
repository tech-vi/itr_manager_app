import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { not_found_404 } from "../assets/images";

const NotFound = () => {
  return (
    <section className="vh-100">
      <Container className="h-100">
        <Row className="h-100 align-items-center justify-content-center">
          <Col sm={12} md={8} lg={6}>
            <Card className="py-5 px-3">
              <Image
                src={not_found_404}
                alt="Not Found 404"
                className="img-fluid mx-auto mb-4"
                // style={{ height: "240px" }}
              />
              <h3 className="text-center fs-3 fw-bold mb-2">
                404 - Not Found.
              </h3>
              <p className="text-center mb-4">
                Server was unable to find the requested resource.
                <br /> Please click the button below to go home.
              </p>

              <div className="text-center">
                <Link replace to={"/"} className="btn btn-dark">
                  Go to Home
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NotFound;
