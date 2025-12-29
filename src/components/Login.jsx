import { useState } from "react";
import { Formik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  function validate(values) {
    const errors = {};
    // Email
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = "Please enter a valid email address";
    }

    // Password (min 8 chars)
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    return errors;
  }

  function handleSubmit(values, { setSubmitting }) {
    setServerError("");

    const result = login({
      identifier: values.identifier.trim(),
      password: values.password,
    });

    if (!result.ok) {
      setServerError(result.message || "Login failed.");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    navigate("/dashboard");
  }

  return (
    <Container className="page">
      <Card className="p-4 shadow-sm" style={{ maxWidth: 640, margin: "0 auto" }}>
        <h2 className="mb-3">Login</h2>

        {serverError && <Alert variant="danger">{serverError}</Alert>}

        <Formik
          initialValues={{ identifier: "", password: "" }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            dirty,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginIdentifier">
                <Form.Label>Email or Username</Form.Label>
                <Form.Control
                  type="text"
                  name="identifier"
                  placeholder="email@example.com or username"
                  value={values.identifier}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.identifier && !!errors.identifier}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.identifier}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex gap-2 align-items-center">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!(dirty && isValid) || isSubmitting}
                >
                  Login
                </Button>

                <span className="text-muted">
                  No account? <Link to="/register">Register</Link>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
}

export default Login;
