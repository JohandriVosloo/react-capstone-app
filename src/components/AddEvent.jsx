import { Formik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEvents } from "../context/EventContext";

function AddEvent() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  function validate(values) {
    const errors = {};
    if (!values.name.trim()) errors.name = "Event name is required";
    if (!values.date) errors.date = "Date is required";
    if (!values.time) errors.time = "Time is required";
    // description/location optional
    return errors;
  }

  function handleSubmit(values, { setSubmitting, resetForm }) {
    addEvent({
      name: values.name.trim(),
      date: values.date,
      time: values.time,
      description: values.description.trim(),
      location: values.location.trim(),
    });

    setSubmitting(false);
    resetForm();
    navigate("/dashboard");
  }

  return (
    <Container className="page">
      <Card className="p-4 shadow-sm" style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="d-flex justify-content-between align-items-center gap-2 mb-3">
          <h2 className="mb-0">Add Event</h2>
          <Button as={Link} to="/dashboard" variant="outline-secondary" size="sm">
            Back
          </Button>
        </div>

        <Formik
          initialValues={{
            name: "",
            date: "",
            time: "",
            description: "",
            location: "",
          }}
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
              <Form.Group className="mb-3" controlId="eventName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="e.g. Dentist appointment"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex flex-wrap gap-3">
                <Form.Group className="mb-3" controlId="eventDate" style={{ flex: 1, minWidth: 220 }}>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.date && !!errors.date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.date}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="eventTime" style={{ flex: 1, minWidth: 220 }}>
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    value={values.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.time && !!errors.time}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.time}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <Form.Group className="mb-3" controlId="eventLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="e.g. 12 Main Road, Cape Town"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="eventDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Optional notes..."
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                disabled={!(dirty && isValid) || isSubmitting}
              >
                Save Event
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
}

export default AddEvent;
