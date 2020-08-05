import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import * as auth from "./../auth/auth-helper";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AppNavbar = withRouter(({ history }) => {
  const { t, i18n } = useTranslation();

  const isActive = (path) => {
    if (history.location.pathname == path) return { color: "#ff4081" };
    else return { color: "#ffffff" };
  };

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    toast.info(t("lang.msg"));
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">UM</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/" className="nav-link" style={isActive("/")}>
            <i className="fa fa-home"></i>
          </Link>
          <Link to="/users" style={isActive("/users")} className="nav-link">
            {t("navbar.users")}
          </Link>
          {!auth.isAuthenticated() && (
            <>
              <Link
                to="/signup"
                style={isActive("/signup")}
                className="nav-link"
              >
                {t("navbar.signup")}
              </Link>
              <Link
                to="/signin"
                style={isActive("/signin")}
                className="nav-link"
              >
                {t("navbar.signin")}
              </Link>
            </>
          )}

          {auth.isAuthenticated() && (
            <>
              <Link
                to={"/user/" + auth.isAuthenticated().user._id}
                style={isActive("/user/" + auth.isAuthenticated().user._id)}
                className="nav-link"
              >
                {t("navbar.profile")}
              </Link>
              <Link
                to="/"
                style={isActive("/signup")}
                onClick={() => {
                  auth.clearJWT(() => history.push("/"));
                }}
                className="nav-link"
              >
                {t("navbar.logout")}
              </Link>
            </>
          )}
        </Nav>
        <div className="ml-auto">
          <select className="custom-select" onChange={changeLanguage}>
            <option value="en" defaultValue>
              EN
            </option>
            <option value="fr">FR</option>
          </select>
        </div>
      </Navbar>
    </>
  );
});

export default AppNavbar;
