import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import * as auth from "./../auth/auth-helper";

const AppNavbar = withRouter(({ history }) => {
  const isActive = (path) => {
    if (history.location.pathname == path) return { color: "#ff4081" };
    else return { color: "#ffffff" };
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/" className="nav-link" style={isActive("/")}>
            <i className="fa fa-home"></i>
          </Link>
          <Link to="/users" style={isActive("/users")} className="nav-link">
            Users
          </Link>
          {!auth.isAuthenticated() && (
            <>
              <Link
                to="/signup"
                style={isActive("/signup")}
                className="nav-link"
              >
                Sign Up
              </Link>
              <Link
                to="/signin"
                style={isActive("/signin")}
                className="nav-link"
              >
                Sign In
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
                My Profile
              </Link>
              <Link
                to="/"
                style={isActive("/signup")}
                onClick={() => {
                  auth.clearJWT(() => history.push("/"));
                }}
                className="nav-link"
              >
                Sign out
              </Link>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
});

export default AppNavbar;
