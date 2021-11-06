import React, { useContext } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ShoppingCartContext, UserContext } from "../App";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";

export const Header = () => {
  const [cart] = useContext(ShoppingCartContext);
  const isLoggedIn = useIsLoggedIn();

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand>
          <Link to="/">React-Bootstrap</Link>
        </Navbar.Brand>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {isLoggedIn && <Link to="/logout">Logout</Link>}
        {isLoggedIn && <Link to="/cart">Cart {cart.length}</Link>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};
