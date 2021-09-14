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
          <div>
            <span>Привет снова, {props.userState.user.email}</span>
            <button type="button" onClick={onSignOut}>
              Выйти
            </button>
          </div>
        );
      }
      case "LoadingUserState": {
        return <div>Загрузка...</div>;
      }
      case "WithoutUserState": {
        return (
          <div>
            <Link to="/login" className={styles.headerLink}>
              Залогиниться
            </Link>
            <Link to="/register">Зарегистрироваться</Link>
          </div>
        );
      }
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Link to="/" className={styles.headerLink}>
          На главную
        </Link>
      </div>
      {getUserView()}
    </div>
  );
}
