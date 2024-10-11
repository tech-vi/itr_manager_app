import { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login_banner } from "../assets/images";
import { useForgotPasswordMutation } from "../api/slices/userAPI.js";
import { toast } from "react-toastify";
// import { DevTool } from "@hookform/devtools";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required!" })
      .email({ message: "Email format is incorrect!" }),
  });

  const form = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(formSchema),
  });

  const {
    // control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = form;

  const [forgotPassword, { isLoading, isSuccess, data, error }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      navigate("/login", { replace: true });
    } else {
      toast.error(error?.data?.message);
    }
  }, [data, error, isSuccess, navigate, reset]);

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container fluid className="vh-100 vw-100">
        <Row className="h-100">
          <Col md={6} className="d-none d-md-block px-0">
            <div
              className="login-banner"
              style={{ backgroundImage: `url(${login_banner})` }}
            ></div>
          </Col>
          <Col md={6}>
            <Row className="h-100 align-items-center justify-content-center">
              <Col sm={10} lg={8} xl={6}>
                <Card className="p-4">
                  <h5 className="mb-2">Did you forget your password.? </h5>
                  <p className="fs-6 fw-light">
                    Enter your email to reset your password.
                  </p>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        isInvalid={!!errors.email}
                        disabled={isLoading}
                      />
                      {errors.email?.message && (
                        <Form.Control.Feedback type="invalid">
                          {errors.email?.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Button
                      variant="dark"
                      type="submit"
                      className="w-100 mb-3"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Sending...
                        </>
                      ) : (
                        <>Send Password Reset Link</>
                      )}
                    </Button>

                    <p className="text-center">
                      Don&apos;t have an account?{" "}
                      <Link to="/register" className="text-decoration-none">
                        Register
                      </Link>
                    </p>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default ForgotPassword;
