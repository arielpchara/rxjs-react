import React from "react";
import { render } from "react-dom";
import { App } from "./App";

const body = document.querySelector("body");
const root = document.createElement("div");

render(<App />, root);

body?.appendChild(root);
