import axios from "axios";
import { useContext, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { ConfirmationContext, ShoppingCartContext } from "../App";
import { createOrder } from "../services/orders";
import { updateFormValue } from "./CreateProductPage";

const DEFAULT_FORM_OBJECT = {
  address: "",
  firstname: "",
  lastname: "",
  cardNumber: "",
};

export const CheckoutPage = () => {
  const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
  const [cart, setCart] = useContext(ShoppingCartContext);
  const [confirmation, setConfirmation] = useContext(ConfirmationContext);
  const history = useHistory();

  const checkout = async (e) => {
    e.preventDefault();
    const order = await createOrder(form, cart);
    setCart([]);
    setConfirmation(order._id);
    history.push("/confirmation");
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <h1>Checkout</h1>

          <Form onSubmit={checkout}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                onChange={updateFormValue("firstname", form, setForm)}
                value={form.firstname}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={updateFormValue("lastname", form, setForm)}
                value={form.lastname}
                type="lastname"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                onChange={updateFormValue("address", form, setForm)}
                value={form.address}
                type="address"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                onChange={updateFormValue("cardNumber", form, setForm)}
                value={form.cardNumber}
                type="cardNumber"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Buy
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
