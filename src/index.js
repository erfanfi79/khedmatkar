import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./containers/app";

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from "react-cookie";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CookiesProvider>
      <App />
   </CookiesProvider>
  </BrowserRouter>
);
