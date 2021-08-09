import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { io } from "socket.io-client";
import { Header } from "./Header";

export function Main() {
  React.useEffect(() => {
    const socket = io('ws://localhost:8000');

    socket.on('auth state updated', (user) => {
      console.log('auth state updated', user)
    })
  })

  return (
    <BrowserRouter>
      <Header
        userState={{ type: "WithoutUserState" }}
        onSignOutRequest={() => {}}
      />

      <Switch>
        <Route exact path="/">
          <div>Home</div>
        </Route>
        <Route path="/login">
          <div>Login</div>
        </Route>
        <Route path="/videoroom">
          <div>Videoroom</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
