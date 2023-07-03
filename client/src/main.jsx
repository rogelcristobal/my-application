import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "./features/store.js";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Router>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode> */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </Router>
    </QueryClientProvider>
  </Provider>
);
