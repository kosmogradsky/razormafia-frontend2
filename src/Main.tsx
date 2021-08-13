import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Socket } from "socket.io-client";
import { Header } from "./Header";
import { Login } from "./Login";
import { Register } from "./Register";
import { UserState } from "./UserState";

export interface MainProps {
  socket: Socket;
}

export function Main(props: MainProps) {
  const [userState, setUserState] = React.useState<UserState>({
    type: "LoadingUserState",
  });

  React.useEffect(() => {
    const onAuthStateUpdated = (user: { id: string; email: string } | null) => {
      if (user === null) {
        setUserState({ type: "WithoutUserState" });
      } else {
        setUserState({
          type: "LoadedUserState",
          user: { email: user.email, uid: user.id },
        });
      }
    };

    props.socket.on("auth state updated", onAuthStateUpdated);

    return () => {
      props.socket.off("auth state updated", onAuthStateUpdated);
    };
  }, [props.socket]);

  return (
    <BrowserRouter>
      <Header socket={props.socket} userState={userState} />

      <Switch>
        <Route exact path="/">
          <div>Home</div>
        </Route>
        <Route path="/login">
          <Login socket={props.socket} />
        </Route>
        <Route path="/register">
          <Register socket={props.socket} />
        </Route>
        <Route path="/videoroom">
          <div>Videoroom</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
