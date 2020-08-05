import React, { useState } from "react";
import { Row, Col, Card, Form, Alert, Button } from "react-bootstrap";
import { signin } from "../auth/api-auth";
import * as auth from "../auth/auth-helper";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Signin = (props) => {
  const { t } = useTranslation();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handelSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const { from } = props.location.state || {
    from: {
      pathname: "/",
    },
  };
  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <Row className="mt-1">
      <Col md={{ span: 6, offset: 3 }}>
        <h1 className="display-4 text-center my-1">{t("signin.title")}</h1>
        <Card className="my-2">
          <Card.Body>
            <Form>
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
            </Form>
            {values.error && (
              <Alert variant="danger" className="mx-3">
                <div className="text-center"> {values.error} </div>
              </Alert>
            )}
            <Button
              variant="primary"
              className="col-md-2 offset-md-5"
              onClick={handelSubmit}
            >
              {t("button.signin")}
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Signin;
