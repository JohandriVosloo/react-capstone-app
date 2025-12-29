import { useState } from "react";
import { Formik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  function validate(values) {
    const errors = {};

    if (!values.name.trim()) errors.name = "Name is required";

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!values.username.trim()) errors.username = "Username is required";

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    return errors;
  }

  function handleSubmit(values, { setSubmitting }) {
    setServerError("");

    const result = register({
      name: values.name.trim(),
      email: values.email.trim(),
      username: values.username.trim(),
      password: values.password,
    });

    if (!result.ok) {
      setServerError(result.message || "Registration failed.");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    navigate("/login");
  }

  return (
    <Container className="page">
      <Card className="p-4 shadow-sm" style={{ maxWidth: 640, margin: "0 auto" }}>
        <h2 className="mb-3">Create Account</h2>

        {serverError && <Alert variant="danger">{serverError}</Alert>}

        <Formik
          initialValues={{ name: "", email: "", username: "", password: "" }}
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
              <Form.Group className="mb-3" controlId="regName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="regEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="regUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.username && !!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="regPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Minimum 8 characters"
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
                  Register
                </Button>

                <span className="text-muted">
                  Already have an account? <Link to="/login">Login</Link>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
}

export default Register;
