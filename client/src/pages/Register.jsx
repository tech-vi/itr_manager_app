import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login_banner } from "../assets/images";
import { useRegisterUserMutation } from "../api/slices/userAPI.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
// import { DevTool } from "@hookform/devtools";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const formSchema = z.object({
    fname: z
      .string()
      .min(1, { message: "First name is required!" })
      .min(3, { message: "First name must be at least 3 characters!" }),
    lname: z.string().min(1, { message: "Last name is required!" }),
    // .min(3, { message: "Last name must be at least 3 characters!" }),
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
    defaultValues: { fname: "", lname: "", email: "", password: "" },
    resolver: zodResolver(formSchema),
  });

  const {
    // control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = form;

  const [registerUser, { isLoading, isSuccess, data, isError, error }] =
    useRegisterUserMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
      reset();
      navigate("/login", { replace: true });
    }
  }, [isSuccess, data, isError, error, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap();
    } catch (error) {
      // console.log("Error during register :", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Container fluid className="vh-100">
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
                  <h5 className="mb-2">Welcome to Virtual India.! </h5>
                  <p className="fs-6 fw-light">
                    Enter your details to register your account.
                  </p>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formFirstName">
                      <Form.Label className="fs-6">First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        {...register("fname")}
                        isInvalid={!!errors.fname}
                      />
                      {errors.fname?.message && (
                        <Form.Control.Feedback type="invalid">
                          {errors.fname?.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        {...register("lname")}
                        isInvalid={!!errors.lname}
                      />
                      {errors.lname?.message && (
                        <Form.Control.Feedback type="invalid">
                          {errors.lname?.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

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

                    {/* <Button variant="dark" type="submit" className="w-100 mb-3">
                      Register
                    </Button> */}

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
                          Registering...
                        </>
                      ) : (
                        <>Register</>
                      )}
                    </Button>

                    <p className="text-center">
                      Already have an account?{" "}
                      <Link to="/login" className="text-decoration-none">
                        Login
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

export default Register;
