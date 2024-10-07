import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../api/slices/userAPI.js";
import { login_banner } from "../assets/images";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z
    .object({
      password: z
        .string()
        .min(1, { message: "Password is required!" })
        .regex(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          { message: "Password format is incorrect!" }
        ),
      confirm_password: z
        .string()
        .min(1, { message: "Confirm Password is required!" }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match!",
      path: ["confirm_password"],
    });

  const form = useForm({
    defaultValues: { password: "", confirm_password: "" },
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  const { token } = useParams();

  const [resetPassword, { isLoading, isSuccess, data }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      reset();
      navigate("/login", { replace: true });
    }
  }, [data, isSuccess, navigate, reset]);

  const onSubmit = async (data) => {
    try {
      const result = await resetPassword({ password: data.password, token });

      if (result.error) {
        throw result.error;
      }
    } catch (error) {
      toast.error(error?.data?.message || "An unexpected error occurred.!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
                  <h5 className="mb-2">Reset your password. </h5>
                  <p className="fs-6 fw-light">
                    Enter your new password to reset.
                  </p>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>

                      <InputGroup className="position-relative">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...register("password")}
                          isInvalid={!!errors.password}
                        />
                        <InputGroup.Text
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </InputGroup.Text>
                        {errors.password?.message && (
                          <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                          </Form.Control.Feedback>
                        )}
                      </InputGroup>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formConfirmPassword"
                    >
                      <Form.Label>Confirm Password</Form.Label>

                      <InputGroup className="position-relative">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          {...register("confirm_password")}
                          isInvalid={!!errors.confirm_password}
                        />
                        <InputGroup.Text
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </InputGroup.Text>
                        {errors.confirm_password?.message && (
                          <Form.Control.Feedback type="invalid">
                            {errors.confirm_password?.message}
                          </Form.Control.Feedback>
                        )}
                      </InputGroup>
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
                          Resetting...
                        </>
                      ) : (
                        <>Reset Password</>
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
      <DevTool control={control} />
    </>
  );
};

export default ResetPassword;
