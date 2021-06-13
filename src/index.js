import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApplicationProvider } from "./Context";


ReactDOM.render(
    <ApplicationProvider>
    <App />
    </ApplicationProvider>
, document.getElementById("root"));
