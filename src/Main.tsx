import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Socket } from "socket.io-client";
import { Header } from "./Header";
import { Login } from "./Login";

export interface MainProps {
  socket: Socket;
}

export function Main(props: MainProps) {
  React.useEffect(() => {
    props.socket.on("auth state updated", (user) => {
      console.log("auth state updated", user);
    });
  });

  return (
    <BrowserRouter>
      <Header socket={props.socket} />

      <Switch>
        <Route exact path="/">
          <div>Home</div>
        </Route>
        <Route path="/login">
          <Login socket={props.socket} />
        </Route>
        <Route path="/register">
          <div>Register</div>
        </Route>
        <Route path="/videoroom">
          <div>Videoroom</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
