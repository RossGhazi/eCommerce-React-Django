import React, { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

function ProductScreen({ match }) {
  // const product = Products.find((item) => item._id === match.params.id);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const url = `/api/products/${match.params.id}`;
      const response = await fetch(url);
      const data = await response.json();
      setProduct(data);
    }
    fetchProduct();
  }, []);

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        {" "}
        Go Back{" "}
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>
            <ListGroup.Item>price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col> Price: </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Status: </Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;