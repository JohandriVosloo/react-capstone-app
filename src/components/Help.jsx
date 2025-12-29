import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

function Help() {
  return (
    <Container className="page">
      <h2 className="mb-3">Help</h2>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title>How to navigate</Card.Title>
          <Card.Text className="text-muted mb-0">
            Use the fixed header at the top of the app to move between
            <Badge bg="dark" className="ms-2">Dashboard</Badge>
            <Badge bg="dark" className="ms-2">Add Event</Badge>
            <Badge bg="dark" className="ms-2">Help</Badge>.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title>Register an account</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Go to <strong>Register</strong> from the header.
            </ListGroup.Item>
            <ListGroup.Item>
              Enter your <strong>Name</strong>, <strong>Email</strong>, <strong>Username</strong>, and <strong>Password</strong>.
            </ListGroup.Item>
            <ListGroup.Item>
              Make sure all fields are filled in and the email is valid.
            </ListGroup.Item>
            <ListGroup.Item>
              Click <strong>Register</strong>, then log in on the Login page.
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Go to <strong>Login</strong>.
            </ListGroup.Item>
            <ListGroup.Item>
              Enter your <strong>Email or Username</strong> and <strong>Password</strong>.
            </ListGroup.Item>
            <ListGroup.Item>
              Click <strong>Login</strong> to access your dashboard.
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title>Create an event</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Click <strong>Add Event</strong> in the header.
            </ListGroup.Item>
            <ListGroup.Item>
              Fill in <strong>Event Name</strong>, <strong>Date</strong>, and <strong>Time</strong> (required).
            </ListGroup.Item>
            <ListGroup.Item>
              Add optional <strong>Location</strong> and <strong>Description</strong>.
            </ListGroup.Item>
            <ListGroup.Item>
              Click <strong>Save Event</strong> to return to the Dashboard.
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title>Edit or delete an event</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              On the <strong>Dashboard</strong>, each event has <strong>Edit</strong> and <strong>Delete</strong> buttons.
            </ListGroup.Item>
            <ListGroup.Item>
              Click <strong>Edit</strong> to update the event details, then save changes.
            </ListGroup.Item>
            <ListGroup.Item>
              Click <strong>Delete</strong> to remove an event permanently.
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Tips for organising events</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Add clear titles and include locations for easier planning.
            </ListGroup.Item>
            <ListGroup.Item>
              Use descriptions for notes like agendas, parking info, or reminders.
            </ListGroup.Item>
            <ListGroup.Item>
              Keep your dashboard up to date by editing or deleting old events.
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Help;
