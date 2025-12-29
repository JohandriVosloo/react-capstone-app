import { useMemo } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";

function Dashboard() {
  const { user } = useAuth();
  const { events, deleteEvent } = useEvents();

  const sortedEvents = useMemo(() => {
    const copy = [...events];
    copy.sort((a, b) => {
      const aKey = `${a.date}T${a.time}`;
      const bKey = `${b.date}T${b.time}`;
      return aKey.localeCompare(bKey);
    });
    return copy;
  }, [events]);

  return (
    <Container className="page">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
        <div>
          <h2 className="mb-1">Dashboard</h2>
          <div className="text-muted">
            Welcome, <strong>{user?.name}</strong> — here are your upcoming events.
          </div>
        </div>

        <Button as={Link} to="/add-event" variant="primary">
          + Add Event
        </Button>
      </div>

      {sortedEvents.length === 0 ? (
        <Alert variant="info">
          No events yet. Click <strong>Add Event</strong> to create your first one.
        </Alert>
      ) : (
        <Row>
          {sortedEvents.map((event) => (
            <Col key={event.id} xs={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start gap-2">
                    <Card.Title className="mb-2">{event.name}</Card.Title>
                    <Badge bg="dark">{event.date}</Badge>
                  </div>

                  <div className="text-muted mb-2">
                    <strong>Time:</strong> {event.time}
                  </div>

                  {event.location && (
                    <div className="text-muted mb-2">
                      <strong>Location:</strong> {event.location}
                    </div>
                  )}

                  {event.description && (
                    <Card.Text className="text-muted">{event.description}</Card.Text>
                  )}

                  <div className="mt-auto d-flex gap-2">
                    <Button
                      as={Link}
                      to={`/edit/${event.id}`}
                      variant="outline-primary"
                      size="sm"
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteEvent(event.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Dashboard;
