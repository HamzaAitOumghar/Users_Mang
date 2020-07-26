import React from "react";
import homeImg from "./../assets/house.png";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <Row>
            <Col md="12">
              <h1 className="display-4">Home Page</h1>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <img src={homeImg} className="img-fluid" />
            </Col>
          </Row>
          <Row></Row>
        </Card.Body>
      </Card>
    </>
  );
};
export default Home;
