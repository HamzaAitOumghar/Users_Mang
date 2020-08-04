import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Col } from "react-bootstrap";
import * as auth from "./../auth/auth-helper";
import { update } from "./api-user";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const UpdateUser = ({ show, handleShow, user }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    redirectToProfile: false,
    userId: "",
  });

  useEffect(() => {
    setValues({
      ...values,
      name: user.name,
      email: user.email,
      userId: user._id,
    });
  }, [user]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handelSubmit = () => {
    const jwt = auth.isAuthenticated();
    const body = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    update({ userId: values.userId }, { t: jwt.token }, body).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, userId: data._id, redirectToProfile: true });
        toast.success("Update Successful");
      }
    });
  };

  if (values.redirectToProfile) {
    return <Redirect to={"/user/" + values.userId} />;
  }

  return (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={values.name}
              onChange={handleChange("name")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={values.email}
              onChange={handleChange("email")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={values.password}
              onChange={handleChange("password")}
            />
          </Form.Group>
          {values.error && (
            <Alert variant="danger" className="mx-3 text-center">
              {values.error}
            </Alert>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleShow}>
          Close
        </Button>
        <Button variant="primary" onClick={handelSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UpdateUser.propTypes = {
  user: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  handleShow: PropTypes.func.isRequired,
};

export default UpdateUser;
