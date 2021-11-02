import React, { useContext } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { ShoppingCartContext } from "../App";

const ShoppingCartItem = ({ product, removeProduct }) => {
  return (
    <Row className="mb-4">
      <Col>
        <img src="./placeholder.svg" />
      </Col>

      <Col>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      </Col>

      <Col>
        <Button variant="primary" onClick={() => removeProduct(product)}>
          Remove
        </Button>
      </Col>
    </Row>
  );
};

export const ShoppingCartPage = () => {
  const [cart, setCart] = useContext(ShoppingCartContext);

  const removeProduct = (product) => {
    setCart(cart.filter((productInCart) => productInCart !== product));
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Shopping Cart ({cart.length} items in cart)</h1>
        </Col>
      </Row>

      {cart.map((product) => (
        <ShoppingCartItem product={product} removeProduct={removeProduct} />
      ))}
    </Container>
  );
};
