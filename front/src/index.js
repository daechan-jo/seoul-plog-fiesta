import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/reset.css";
import "./styles/mystyle.css";
import "./styles/global.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
