import React, { useContext } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { ShoppingCartContext } from "../App";

const ShoppingCartItem = ({ product, removeProduct }) => {
  return (
    <Row className="mb-4">
      <Col>
        <img className="w-100" src={`http://localhost:8080/${product.image}`} />
      </Col>

      <Col>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>${product.cost}</Card.Text>
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
  const history = useHistory();

  const totalCost = cart.reduce((sum, product) => sum + product.cost, 0);

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

      <Row className="mb-4">
        <Col>
          <h1>Total cost ${totalCost}</h1>
          <Button variant="secondary" onClick={() => history.push("/checkout")}>
            Check Out
          </Button>
        </Col>
      </Row>

      {cart.map((product) => (
        <ShoppingCartItem product={product} removeProduct={removeProduct} />
      ))}
    </Container>
  );
};
