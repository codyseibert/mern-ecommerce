import { useContext, useState } from "react";
import axios from "axios";
import { Col, Container, Form, Button, Row } from "react-bootstrap";
import { UserContext } from "../App";
import { useHistory } from "react-router";

const DEFAULT_FORM_OBJECT = {
  name: "",
  cost: 0,
  description: "",
};

export const updateFormFileValue = (key, form, setForm) => (e) => {
  setForm({
    ...form,
    [key]: e.target.files[0],
  });
};

export const updateFormValue = (key, form, setForm) => (e) => {
  setForm({
    ...form,
    [key]: e.currentTarget.value,
  });
};

export const CreateProductPage = () => {
  const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
  const [user] = useContext(UserContext);
  const history = useHistory();

  const createProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("cost", form.cost);
    formData.append("description", form.description);
    formData.append("file", form.file);
    await axios.post("http://localhost:8080/products", formData, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    });
    setForm(DEFAULT_FORM_OBJECT);
    history.push("/");
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
                onChange={updateFormValue("name", form, setForm)}
                value={form.name}
                type="name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                onChange={updateFormValue("cost", form, setForm)}
                value={form.cost}
                type="number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={updateFormValue("description", form, setForm)}
                value={form.description}
                as="textarea"
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                onChange={updateFormFileValue("file", form, setForm)}
                type="file"
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
