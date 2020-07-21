import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import * as auth from "./auth-helper";

const PrivateRoute = ({ conponent: Component, ...rest }) => {
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      )
    }
  />;
};

export default PrivateRoute;
