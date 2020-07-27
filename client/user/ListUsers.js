import React, { useEffect, useState } from "react";
import { list } from "./api-user";
import { Link } from "react-router-dom";
import { ListGroup, Col, Row, Card } from "react-bootstrap";
import userImg from "./../assets/user.png";
import nextImg from "./../assets/next.png";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <Row className="mt-1">
      <Col md={{ span: 6, offset: 3 }}>
        <Card className="text-center">
          <Card.Body>
            <Row className="my-2">
              <Col>
                <h1 className="display-4" style={{ fontSize: "30px" }}>
                  All Users
                </h1>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <ListGroup variant="flush">
                  {users.map((item, i) => {
                    return (
                      <Row className="my-1" key={i}>
                        <Col md="2" className="my-auto">
                          <img src={userImg} className="img-fluid" />
                        </Col>
                        <Col md="8" className="my-auto">
                          <Link to={"/user/" + item._id}>
                            <ListGroup.Item style={{ border: "0px" }}>
                              {item.name}
                            </ListGroup.Item>
                          </Link>
                        </Col>
                        <Col md="2" className="my-auto">
                          <Link to={"/user/" + item._id}>
                            <img src={nextImg} className="img-fluid" />
                          </Link>
                        </Col>
                      </Row>
                    );
                  })}
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ListUsers;
