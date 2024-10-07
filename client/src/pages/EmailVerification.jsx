import { Link, useParams } from "react-router-dom";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useVerifyEmailQuery } from "../api/slices/userAPI.js";
import { not_verified, verified } from "../assets/images/index.js";

const EmailVerification = () => {
  const { verification_token } = useParams();

  const { data, error, isSuccess } = useVerifyEmailQuery({
    verification_token,
  });
  console.log(data);

  return (
    <>
      <section className="vh-100">
        <Container className="h-100">
          <Row className="h-100 align-items-center justify-content-center">
            <Col sm={12} md={8} lg={6}>
              <Card className="py-5 px-2">
                {isSuccess ? (
                  <>
                    <Image
                      src={verified}
                      alt="verified"
                      className="img-fluid mx-auto mb-4"
                      style={{ width: "160px", height: "160px" }}
                    />
                    <h3 className="text-center fs-3 fw-bold mb-2">
                      Welcome to Virual India.!
                    </h3>
                    <p className="text-center mb-4">
                      Your email has been verified successfully.! <br /> Please
                      click the button below to continue.!
                    </p>
                  </>
                ) : (
                  <>
                    <Image
                      src={not_verified}
                      alt="not_verified"
                      className="img-fluid mx-auto mb-4"
                      style={{ width: "200px", height: "200px" }}
                    />
                    <h3 className="text-center fs-3 fw-bold mb-2">
                      {/* 403 - Forbidden.! */}
                      {error?.status} - {error?.data.message}
                    </h3>
                    <p className="text-center mb-4">
                      Your verification link has expired or is invalid.! <br />{" "}
                      Please click the button below to try again.!
                    </p>
                  </>
                )}
                <div className="text-center">
                  <Link replace to={"/login"} className="btn btn-dark">
                    Go back to Login
                  </Link>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default EmailVerification;
