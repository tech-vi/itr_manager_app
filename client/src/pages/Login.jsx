import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Stack,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { login_banner } from "../assets/images";
import { login } from "../app/features/authSlice.js";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "../api/slices/userAPI.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
// import { DevTool } from "@hookform/devtools";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required!" })
      .email({ message: "Email format is incorrect!" }),
    password: z
      .string()
      .min(1, { message: "Password is required!" })
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: "Password format is incorrect!" }
      ),
  });

  const form = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(formSchema),
  });

  const {
    // control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = form;

  const [loginUser, { isLoading, isSuccess, isError, data, error }] =
    useLoginUserMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      dispatch(login(data));
      reset();
      navigate("/", { replace: true });
    }
  }, [data, error, isError, isSuccess, dispatch, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      await loginUser(data).unwrap();
    } catch (error) {
      // console.log("Error during login :", error);
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
                  <h5 className="mb-2">Welcome back to Virtual India.! </h5>
                  <p className="fs-6 fw-light">
                    Enter your credentials to login your account.
                  </p>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        isInvalid={!!errors.email}
                      />
                      {errors.email?.message && (
                        <Form.Control.Feedback type="invalid">
                          {errors.email?.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Stack
                        direction="horizontal"
                        gap={3}
                        className="align-items-center justify-content-between"
                      >
                        <Form.Label>Password</Form.Label>
                        <Link
                          className="text-decoration-none mb-2"
                          to="/forgot_pwd"
                        >
                          Forgot Password?
                        </Link>
                      </Stack>
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
                          Logging in...
                        </>
                      ) : (
                        <>Login</>
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

export default Login;
