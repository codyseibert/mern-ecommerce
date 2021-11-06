import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Form,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useIsAdmin } from "../hooks/useIsAdmin";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";

import { ShoppingCartContext, UserContext } from "../App";

const ProductCard = ({ isAdmin, isLoggedIn, product, addProductToCart }) => {
  return (
    <Card key={product._id} className="mb-4">
      <Card.Img variant="top" src="./placeholder.svg" />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        {isLoggedIn && (
          <Button variant="primary" onClick={() => addProductToCart(product)}>
            Add to Cart
          </Button>
        )}
        {isAdmin && <Link to={`/products/${product._id}/edit`}>Edit</Link>}
      </Card.Body>
    </Card>
  );
};

const NUMBER_OF_COLUMNS = 3;

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [cart, setCart] = useContext(ShoppingCartContext);
  const isAdmin = useIsAdmin();
  const isLoggedIn = useIsLoggedIn();

  const addProductToCart = (product) => {
    setCart([...cart, { ...product }]);
    setShowToast(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: prods } = await axios.get("http://localhost:8080/products");
      setProducts(prods);
    };
    fetchProducts();
  }, []);

  const getFilteredProducts = (products) => {
    return products.filter((product) => product.name.includes(search));
  };

  const getProductsInColumn = (products, numberOfColumns, column) => {
    return products.filter((col, index) => index % numberOfColumns === column);
  };

  const onSearchChange = (e) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <>
      <ToastContainer
        style={{ zIndex: "1" }}
        className="p-3 position-fixed"
        position={"top-center"}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Successful</strong>
          </Toast.Header>
          <Toast.Body>Product added to cart.</Toast.Body>
        </Toast>
      </ToastContainer>
      <Container>
        <Row>
          <Col>
            <Form.Control
              size="lg"
              type="text"
              value={search}
              className="mb-4 mt-4"
              placeholder="search for a product by name"
              onChange={onSearchChange}
            />
          </Col>
        </Row>
        <Row>
          {new Array(NUMBER_OF_COLUMNS).fill("").map((value, column) => (
            <Col key={column}>
              {getProductsInColumn(
                getFilteredProducts(products),
                NUMBER_OF_COLUMNS,
                column
              ).map((product) => (
                <ProductCard
                  isLoggedIn={isLoggedIn}
                  isAdmin={isAdmin}
                  key={product._id}
                  product={product}
                  addProductToCart={addProductToCart}
                />
              ))}
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
