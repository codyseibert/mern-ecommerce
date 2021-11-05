import { useContext, useState } from "react";
import axios from "axios";
import { Col, Container, Form, Button, Row } from "react-bootstrap";
import { UserContext } from "../App";

const DEFAULT_FORM_OBJECT = {
  name: "",
  cost: 0,
  description: "",
};

export const CreateProductPage = () => {
  const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
  const [user] = useContext(UserContext);

  const updateFormValue = (key) => (e) => {
    setForm({
      ...form,
      [key]: e.currentTarget.value,
    });
  };

  const createProduct = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/products", form, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setForm(DEFAULT_FORM_OBJECT);
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <h1>Create Product</h1>
          <Form onSubmit={createProduct}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={updateFormValue("name")}
                value={form.name}
                type="name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                onChange={updateFormValue("cost")}
                value={form.cost}
                type="number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={updateFormValue("description")}
                value={form.description}
                as="textarea"
                rows={3}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
