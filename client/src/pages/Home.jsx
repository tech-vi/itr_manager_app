import { Col, Container, Image, Row } from "react-bootstrap";
import { hero } from "../assets/images";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "/vi-logo.png";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const title = isLoggedIn ? "Welcome back to " : "Welcome to ";
  const label = isLoggedIn ? "Go to Dashboard" : "Get Started";
  const to = isLoggedIn ? "/dashboard" : "/login";
  return (
    <section className="hero" style={{ backgroundImage: `url(${hero})` }}>
      <Container>
        <Row>
          <Col xs={12} lg={6}>
            <Image
              src={logo}
              alt="VI"
              className="img-fluid position-relative z-3"
              style={{ width: "48px", height: "48px", margin: "10px 0" }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <div
              className="position-relative z-3 "
              style={{ marginTop: "160px", color: "white" }}
            >
              <h1 className="hero-title fw-bold">
                <span className="fs-4 fw-medium">{title}</span> <br /> Virtual
                India.
              </h1>
              <p className="lead mb-5">
                Accounting, Legal and Regulatory Compliance.
              </p>
              <h2 className="mb-4 fw-bold">ITR Filing Management App</h2>
              <Link to={to} className="btn btn-primary">
                {label}
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
