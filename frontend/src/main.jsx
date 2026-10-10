import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { CareerProvider } from "./context/CareerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CareerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CareerProvider>
  </React.StrictMode>
);