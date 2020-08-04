import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { remove } from "./api-user";
import { toast } from "react-toastify";
import * as auth from "./../auth/auth-helper";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
const DeleteUser = ({ id, show, handleClose }) => {
  const [redirect, setRedirect] = useState(false);

  const handleDelete = () => {
    const jwt = auth.isAuthenticated();

    remove({ userId: id }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        toast.error(data.error);
      } else {
        auth.clearJWT(() => console.log("deleted"));
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Confirm to delete your account</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteUser.propTypes = {
  id: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DeleteUser;
