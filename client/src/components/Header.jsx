import React, { useContext } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ShoppingCartContext } from "../App";
import { useIsAdmin } from "../hooks/useIsAdmin";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";

export const Header = () => {
  const [cart] = useContext(ShoppingCartContext);
  const isLoggedIn = useIsLoggedIn();
  const isAdmin = useIsAdmin();

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand>
          <Link to="/">MERN Shopping Cart</Link>
        </Navbar.Brand>
        {isAdmin && <Link to="/create-product">Create Product</Link>}
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/register">Register</Link>}
        {isLoggedIn && <Link to="/logout">Logout</Link>}
        {isLoggedIn && !isAdmin && <Link to="/cart">Cart {cart.length}</Link>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};
