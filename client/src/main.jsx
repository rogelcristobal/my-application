import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "./features/store.js";
import { Provider } from "react-redux";
import { BrowserRouter as Router ,useNavigate} from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
const queryClient = new QueryClient();
const key = "pk_test_ZmFpci1mb3hob3VuZC04LmNsZXJrLmFjY291bnRzLmRldiQ";

ReactDOM.createRoot(document.getElementById("root")).render(
    // const navigate = useNavigate();
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <ClerkProvider publishableKey={key}>
          <Router>
            {/* <React.StrictMode> */}
            <App />
            {/* </React.StrictMode> */}
          </Router>
        </ClerkProvider>
      </SocketProvider>
    </QueryClientProvider>
  </Provider>
);
{
  /* <ReactQueryDevtools initialIsOpen={false} /> */
}
