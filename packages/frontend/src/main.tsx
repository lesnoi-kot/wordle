import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import "core-js/es/array";

import { ToastsProvider } from "./components/Toasts/ToastsProvider.tsx";
import { ErrorBoundaryFallback } from "./components/ErrorBoundaryFallback.tsx";
import App from "./App.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <ToastsProvider>
        <App />
      </ToastsProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
