import React, { useContext } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ShoppingCartContext } from "../App";

export const Header = () => {
  const [cart] = useContext(ShoppingCartContext);

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand>
          <Link to="/">React-Bootstrap</Link>
        </Navbar.Brand>
        <Link to="/cart">Cart {cart.length}</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};
