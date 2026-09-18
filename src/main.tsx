import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { I18nProvider } from "./i18n";
import { ErrorBoundary } from "./components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <I18nProvider>
      <App />
    </I18nProvider>
  </ErrorBoundary>
);
