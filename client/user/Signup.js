import React, { useState } from "react";
import { create } from "./api-user";
import { Form, Card, Button, Col, Modal, Alert, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();

  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
  });

  const [showAlert, setShowAlert] = useState(true);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handelSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  return (
    <Row className="mt-1">
      <Col md={{ span: 6, offset: 3 }}>
        <h1 className="display-4 text-center">{t("signup.title")}</h1>
        <Card className="px-5 mx-5">
          <Card.Body>
            <Form>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>{t("from.name")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={values.name}
                  onChange={handleChange("name")}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>{t("from.email")}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange("email")}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>{t("from.password")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={values.password}
                  onChange={handleChange("password")}
                />
              </Form.Group>
              {values.error && (
                <Alert
                  variant="danger"
                  className="mx-3"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  <Alert.Heading> {values.error}</Alert.Heading>
                </Alert>
              )}
              <Button
                variant="primary"
                className="col-md-4 offset-md-4"
                onClick={handelSubmit}
              >
                {t("button.signup")}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <Modal
          show={values.open}
          onHide={() => {
            setValues({ ...values, open: !values.open });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>New Account Successfully created</Modal.Body>
          <Modal.Footer>
            <Link to="/signin">
              <Button variant="primary">{t("button.signin")}</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
};

export default Signup;
