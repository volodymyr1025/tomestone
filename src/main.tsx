import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

const root = createRoot(document.getElementById("root")!);

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

const backend = isTouchDevice() ? TouchBackend : HTML5Backend;

root.render(
  <React.StrictMode>
    <DndProvider backend={backend}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </DndProvider>
  </React.StrictMode>
);
