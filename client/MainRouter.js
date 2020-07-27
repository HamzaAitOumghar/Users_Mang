import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import ListUsers from "./user/ListUsers";
import Signup from "./user/Signup";
import AppNavbar from "./core/AppNavbar";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
const MainRouter = () => {
  return (
    <div>
      <AppNavbar></AppNavbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={ListUsers} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/user/:userId" component={Profile} />
      </Switch>
    </div>
  );
};
export default MainRouter;
