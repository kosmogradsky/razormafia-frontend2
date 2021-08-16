import * as React from "react";
import { Socket } from "socket.io-client";
import { GameQueue } from "./GameQueue";
import { UserState } from "./UserState";

export interface HomeProps {
  socket: Socket;
  userState: UserState;
}

export function Home(props: HomeProps) {
  return <GameQueue userState={props.userState} socket={props.socket} />;
}
