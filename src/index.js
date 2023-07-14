import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SingleRecipe } from "../src/components/SingleRecipe";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/recipe/:id" element={<SingleRecipe />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
