import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
  return (
    <Container fluid className="bg-dark p-5">
      <Row className="text-center">
        <Col>
          &copy; Copy right all reserved. || Made by <a href="/anil">Anil</a>
        </Col>
      </Row>
    </Container>
  );
};
