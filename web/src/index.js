import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import Dashboard from "./example/Dashboard";
import Search from "./Search";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Search />
  </StrictMode>
);