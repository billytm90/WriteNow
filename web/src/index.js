import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import Dashboard from "./example/Dashboard";
import Search from "./Search";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}><Search /></QueryClientProvider>
    
  </StrictMode>
);