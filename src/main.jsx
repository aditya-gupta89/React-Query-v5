import { QueryClient } from "@tanstack/react-query";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
export const queryClient = new QueryClient();

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
