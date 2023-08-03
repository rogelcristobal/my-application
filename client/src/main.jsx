import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "./features/store.js";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.jsx";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <Router>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode> */}
        </Router>
      </SocketProvider>
    </QueryClientProvider>
  </Provider>
);
{/* <ReactQueryDevtools initialIsOpen={false} /> */}
