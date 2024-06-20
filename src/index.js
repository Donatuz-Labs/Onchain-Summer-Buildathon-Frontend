import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const divContainer = document.getElementById("app");

const root = createRoot(divContainer);
root.render(<App />);
