import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter } from "react-router-dom"; // Change to HashRouter
import { ThemeProvider } from "@/components/theme-provider";
import { TempoDevtools } from "tempo-devtools";

TempoDevtools.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <HashRouter> {/* Remove basename prop */}
        <App />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);