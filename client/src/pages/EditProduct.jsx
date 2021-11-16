import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Form, Button, Row } from "react-bootstrap";
import { UserContext } from "../App";
import { useHistory, useParams } from "react-router";
import { updateFormFileValue, updateFormValue } from "./CreateProductPage";

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
        image: product.image,
      });
    };
    getProduct();
  }, []);

  const deleteProduct = async () => {
    await axios.delete(`http://localhost:8080/products/${productId}`, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    });
    history.push("/");
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("cost", form.cost);
    formData.append("description", form.description);
    formData.append("file", form.file);
    await axios.patch(`http://localhost:8080/products/${productId}`, formData, {
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
          <h1>Edit Product</h1>
          <Button onClick={deleteProduct} variant="danger">
            Delete
          </Button>
          <Form onSubmit={updateProduct}>
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

            <img
              className="w-100"
              src={`http://localhost:8080/${form.image}`}
            />
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                onChange={updateFormFileValue("file", form, setForm)}
                type="file"
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
