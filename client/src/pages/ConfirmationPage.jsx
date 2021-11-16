import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ConfirmationContext } from "../App";

export const ConfirmationPage = () => {
  const [confirmation] = useContext(ConfirmationContext);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <h1>Confirmation</h1>
          <p>
            your confirmation number is <b>{confirmation}</b>
          </p>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
