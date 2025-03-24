import React, { Suspense, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import { Toaster } from "react-hot-toast";
import "./Index.css";
import Loader from "./shared/loader/Loader.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
createRoot(document.getElementById("root")).render(
  <ErrorBoundary errorMessage="Oops, something went wrong while fetching data. Please try again later.">
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <StrictMode>
          <Toaster position="top-right" reverseOrder={false} />
          <App />
        </StrictMode>
      </Provider>
    </Suspense>
  </ErrorBoundary>
);