import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import * as serviceWorker from "./serviceWorker";
/* Using BrowserRouter to handle dynamic requests from Express Server */
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

/* Router components expects to only contain one child component that's why combining everything in App and importing the same */
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);


//serviceWorker.unregister();