import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </HashRouter>
);
