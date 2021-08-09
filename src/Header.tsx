import * as React from "react";
import { Link } from "react-router-dom";
import { UserState } from "./UserState";

const styles = require("./Header.css").default;

export interface HeaderProps {
  userState: UserState;
  onSignOutRequest(): void;
}

export function Header(props: HeaderProps) {
  function getUserView() {
    switch (props.userState.type) {
      case "LoadedUserState": {
        return (
          <>
            <span>Привет снова, {props.userState.user.email}</span>
            <button type="button" onClick={props.onSignOutRequest}>
              Выйти
            </button>
          </>
        );
      }
      case 'LoadingUserState': {
        return <>Загрузка...</>
      }
      case 'WithoutUserState': {
        return (
          <>
            <Link to="/login" className={styles.loginLink}>
              Залогиниться
            </Link>
            <Link to='/register'>Зарегистрироваться</Link>
          </>
        )
      }
    }
  }

  return <div className={styles.container}>{getUserView()}</div>
}
