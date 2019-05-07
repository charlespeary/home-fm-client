import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./App";
import * as serviceWorker from "./serviceWorker";
import { notification } from "antd";
// configure antd notification, set it to the bottom right
notification.config({
  placement: "bottomRight",
  bottom: -5
});

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
