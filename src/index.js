import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const divContainer = document.getElementById("app");

const root = createRoot(divContainer);
root.render(<App />);
