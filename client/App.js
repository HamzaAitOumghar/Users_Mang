import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <BrowserRouter>
      <MainRouter />
      <ToastContainer autoClose={3000} hideProgressBar />
    </BrowserRouter>
  );
};

export default hot(module)(App);
