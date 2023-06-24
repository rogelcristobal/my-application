import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <AuthContextProvider>

        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  </QueryClientProvider>
);
