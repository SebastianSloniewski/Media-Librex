import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function SearchBar() {
  return (
    <Container fluid className="lg-12" style={{margin: "3px"}}>
      <Row>
        <Col lg={12}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 rounded-pill"
              aria-label="Search"
            />
            <Button className="rounded-pill" variant="outline-primary">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}