import React, { Suspense } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
import "bootstrap/dist/css/bootstrap.min.css";
//import "react-toastify/dist/ReactToastify.min.css";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";
import "../config/i18n";

import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <MainRouter />
        <ToastContainer autoClose={3000} hideProgressBar />
      </Suspense>
    </BrowserRouter>
  );
};

export default hot(module)(App);
