import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Form, Button, Row } from "react-bootstrap";
import { UserContext } from "../App";
import { useHistory, useParams } from "react-router";

const DEFAULT_FORM_OBJECT = {
  name: "",
  cost: 0,
  description: "",
};

export const EditProduct = () => {
  const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
  const [user] = useContext(UserContext);
  const { productId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getProduct = async () => {
      const { data: product } = await axios.get(
        `http://localhost:8080/products/${productId}`
      );
      setForm({
        cost: product.cost,
        name: product.name,
        description: product.description,
      });
    };
    getProduct();
  }, []);

  const updateFormValue = (key) => (e) => {
    setForm({
      ...form,
      [key]: e.currentTarget.value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:8080/products/${productId}`, form, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    history.push("/");
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <h1>Edit Product</h1>
          <Form onSubmit={updateProduct}>
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
              Save
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
