import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router";
import Layout from "./Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Layout />
    </HashRouter>
  </StrictMode>
);
