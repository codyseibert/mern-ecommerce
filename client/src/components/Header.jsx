import React, { useContext } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ShoppingCartContext, UserContext } from "../App";

export const Header = () => {
  const [cart] = useContext(ShoppingCartContext);
  const [user] = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand>
          <Link to="/">React-Bootstrap {user.user?.username}</Link>
        </Navbar.Brand>
        <Link to="/cart">Cart {cart.length}</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};
