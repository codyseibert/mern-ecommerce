import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

import { ShoppingCartContext } from "../App";

const ProductCard = ({ product, addProductToCart }) => {
  return (
    <div key={product._id}>
      <Card>
        <Card.Img variant="top" src="./placeholder.svg" />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Button variant="primary" onClick={() => addProductToCart(product)}>
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

const NUMBER_OF_COLUMNS = 3;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useContext(ShoppingCartContext);

  const addProductToCart = (product) => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: prods } = await axios.get("http://localhost:8080/products");
      setProducts(prods);
    };
    fetchProducts();
  }, []);

  const getProductsInColumn = (products, numberOfColumns, column) => {
    return products.filter((col, index) => index % numberOfColumns === column);
  };

  return (
    <Container>
      <Row>
        {new Array(NUMBER_OF_COLUMNS).fill("").map((value, column) => (
          <Col>
            {getProductsInColumn(products, NUMBER_OF_COLUMNS, column).map(
              (product) => (
                <ProductCard
                  product={product}
                  addProductToCart={addProductToCart}
                />
              )
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsPage;
