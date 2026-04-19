import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./pages/Provider/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </HelmetProvider>
  </StrictMode>,
)
