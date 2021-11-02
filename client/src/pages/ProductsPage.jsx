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

import { ShoppingCartContext } from "../App";

const ProductCard = ({ product, addProductToCart }) => {
  return (
    <Card key={product._id} className="mb-4">
      <Card.Img variant="top" src="./placeholder.svg" />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Button variant="primary" onClick={() => addProductToCart(product)}>
          Add to Cart
        </Button>
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
        style={{ "z-index": "1" }}
        className="p-3 position-fixed"
        position={"top-center"}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
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
            <Col>
              {getProductsInColumn(
                getFilteredProducts(products),
                NUMBER_OF_COLUMNS,
                column
              ).map((product) => (
                <ProductCard
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
