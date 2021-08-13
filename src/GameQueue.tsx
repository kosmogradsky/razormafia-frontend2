import * as React from "react";
import { Socket } from "socket.io-client";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import { getNumberWithCase } from "./getNumberWithCase";
import { UserState } from "./UserState";

interface GameQueueProps {
  socket: Socket;
  userState: UserState;
}

export function GameQueue(props: GameQueueProps) {
  const getSearchForm = () => {
    switch (props.userState.type) {
      case "LoadedUserState": {
        return <GameQueueForm user={props.userState.user} />;
      }
      case "LoadingUserState": {
        return <div>Загрузка...</div>;
      }
      case "WithoutUserState": {
        return <div>Чтобы начать поиск, сначала залогиньтесь.</div>;
      }
    }
  };

  const [playersInQueueCount, setPlayersInQueueCount] =
    React.useState<number>(0);

  React.useEffect(() => {
    props.socket.emit("subscribe to queue length");

    return () => {
      props.socket.emit("unsubscribe from queue length");
    };
  }, [props.socket]);

  React.useEffect(() => {
    const onQueueLengthUpdated = (updatedCount: number) => {
      setPlayersInQueueCount(updatedCount);
    };

    props.socket.on("queue length updated", onQueueLengthUpdated);

    return () => {
      props.socket.off("queue length updated", onQueueLengthUpdated);
    };
  }, [props.socket]);

  return (
    <div>
      <div>Поиск игры</div>
      <div>
        {playersInQueueCount === 0
          ? "Нет игроков."
          : capitalizeFirstLetter(
              getNumberWithCase(
                playersInQueueCount,
                "игрок ищет",
                "игрока ищут",
                "игроков ищут"
              )
            ) + " игру."}
      </div>
      {getSearchForm()}
    </div>
  );
}
