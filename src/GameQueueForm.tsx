import * as React from "react";
import { Socket } from "socket.io-client";

export interface GameQueueFormProps {
  socket: Socket;
}

export function GameQueueForm(props: GameQueueFormProps) {
  const [isQueueing, setIsQueueing] = React.useState<boolean>(false);

  React.useEffect(() => {
    const onEnteredQueue = () => {
      setIsQueueing(true);
    };

    props.socket.on("entered queue", onEnteredQueue);

    return () => {
      props.socket.off("entered queue", onEnteredQueue);
    };
  }, [props.socket]);

  React.useEffect(() => {
    const onExitedQueue = () => {
      setIsQueueing(false);
    };

    props.socket.on("exited queue", onExitedQueue);

    return () => {
      props.socket.off("exited queue", onExitedQueue);
    };
  }, [props.socket]);

  const startSearching = React.useCallback(() => {
    props.socket.emit("enter queue");
  }, [props.socket]);

  const stopSearching = React.useCallback(() => {
    props.socket.emit("exit queue");
  }, [props.socket]);

  return isQueueing ? (
    <>
      <div>Вы ищете игру</div>
      <button type="button" onClick={stopSearching}>Остановить поиск</button>
    </>
  ) : (
    <button type="button" onClick={startSearching}>Начать поиск</button>
  )
}
