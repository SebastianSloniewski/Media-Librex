import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";



export default function SearchBar() {
  return (
    <div className="lg-12 search__bar" >
      <Row>
        <Col lg={12}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 rounded-pill"
              aria-label="Search"
            />
            <Button className="rounded-pill" variant="outline-primary" >
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}