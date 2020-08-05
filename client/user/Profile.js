import React, { useState, useEffect } from "react";
import * as auth from "../auth/auth-helper";
import { read } from "./api-user";
import { Redirect } from "react-router-dom";
import { Card } from "react-bootstrap";
import userImg from "./../assets/user.png";
import moment from "moment";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import { useTranslation } from "react-i18next";

const Profile = ({ match }) => {
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [showUpdate, handleShowUpdate] = useState(false);
  const [showDelete, handleShowDelete] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const jwt = auth.isAuthenticated();
    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setRedirectToSignin(true);
        } else {
          setUser(data);
        }
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-md-8 offset-md-2">
          <Card>
            <h1 className="display-4 ml-3" style={{ fontSize: "30px" }}>
              {t("users.profile")}
            </h1>
            <Card.Body>
              <div className="row">
                <div className="col-md-2 my-auto">
                  <img src={userImg} />
                </div>
                <div className="col-md-8 my-auto">
                  <div className="font-weight-bold">{user.name}</div>
                  <div>{user.email}</div>
                </div>
                <div className="col-md-2 my-auto">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Second group"
                  >
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        handleShowUpdate(true);
                      }}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        handleShowDelete(true);
                      }}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-12">
                  {t("users.joined")} :{" "}
                  <strong className="text-danger">
                    {moment(user.created).format("MMMM Do YYYY, h:mm:ss a")}
                  </strong>
                </div>
              </div>
            </Card.Body>
            <UpdateUser
              t={t}
              user={user}
              show={showUpdate}
              handleShow={() => {
                handleShowUpdate(!showUpdate);
              }}
            />
            <DeleteUser
              t={t}
              id={match.params.userId}
              show={showDelete}
              handleClose={() => {
                handleShowDelete(!showDelete);
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
