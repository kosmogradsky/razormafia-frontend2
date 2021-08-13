import * as React from "react";
import { Link } from "react-router-dom";
import { Socket } from "socket.io-client";
import { UserState } from "./UserState";

const styles = require("./Header.css").default;

export interface HeaderProps {
  userState: UserState;
  socket: Socket;
}

export function Header(props: HeaderProps) {
  const onSignOut = React.useCallback(() => {
    props.socket.emit("sign out");
  }, [props.socket]);

  function getUserView() {
    switch (props.userState.type) {
      case "LoadedUserState": {
        return (
          <>
            <span>Привет снова, {props.userState.user.email}</span>
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
