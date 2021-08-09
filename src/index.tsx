import * as React from "react";
import { render } from "react-dom";
import { io } from "socket.io-client";
import { Main } from "./Main";

const root = document.createElement("div");

const socket = io("ws://localhost:8000");

render(<Main socket={socket} />, root);

document.body.appendChild(root);
