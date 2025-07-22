// client/src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import FormPage from "./FormPage"; // ✅ import the form page
import "./index.css"; // optional: if you're using Tailwind or global styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
