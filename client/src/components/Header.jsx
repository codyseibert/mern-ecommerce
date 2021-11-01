import React, { useContext } from "react";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";

import { ShoppingCartContext } from "../App";

export const Header = () => {
  const [cart] = useContext(ShoppingCartContext);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        Cart {cart.length}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};
