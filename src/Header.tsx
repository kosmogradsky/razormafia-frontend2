import * as React from "react";
import { Link } from "react-router-dom";
import { Socket } from "socket.io-client";
import { UserState } from "./UserState";

const styles = require("./Header.css").default;

export interface HeaderProps {
  socket: Socket;
}

export function Header(props: HeaderProps) {
  const [userState, setUserState] = React.useState<UserState>({
    type: "LoadingUserState",
  });

  const onSignOut = React.useCallback(() => {
    props.socket.emit("sign out");
  }, [props.socket]);

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

  function getUserView() {
    switch (userState.type) {
      case "LoadedUserState": {
        return (
          <>
            <span>Привет снова, {userState.user.email}</span>
            <button type="button" onClick={onSignOut}>
              Выйти
            </button>
          </>
        );
      }
      case "LoadingUserState": {
        return <>Загрузка...</>;
      }
      case "WithoutUserState": {
        return (
          <>
            <Link to="/login" className={styles.loginLink}>
              Залогиниться
            </Link>
            <Link to="/register">Зарегистрироваться</Link>
          </>
        );
      }
    }
  }

  return <div className={styles.container}>{getUserView()}</div>;
}
