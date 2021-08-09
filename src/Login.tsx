import * as React from "react";
import { useHistory } from "react-router";
import { Socket } from "socket.io-client";

interface LoginState {
  email: string;
  password: string;
  message: string;
}

export interface LoginProps {
  socket: Socket;
}

export function Login(props: LoginProps) {
  const [loginState, setLoginState] = React.useState<LoginState>({
    email: "",
    password: "",
    message: "",
  });
  const history = useHistory();

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      props.socket.emit(
        "sign in with email and password",
        loginState.email,
        loginState.password
      );
    },
    [loginState, props.socket]
  );

  React.useEffect(() => {
    const onError = (description: string) => {
      if (description === "WRONG_EMAIL_OR_PASSWORD") {
        setLoginState({
          ...loginState,
          message:
            "Вы не зарегистрированы или ввели неправльный пароль. Проверьте, что электронная почта и пароль введены без ошибок.",
        });
      } else {
        setLoginState({
          ...loginState,
          message:
            "Произошла ошибка. Проверьте введённые данные и попробуйте ещё раз.",
        });
      }
    };

    props.socket.on("sign in with email and password error", onError);

    return () => {
      props.socket.off("sign in with email and password error", onError);
    };
  }, [loginState, props.socket]);

  React.useEffect(() => {
    const onSuccess = () => {
      history.push("/");
    };

    props.socket.on("sign in with email and password success", onSuccess);

    return () => {
      props.socket.off("sign in with email and password success", onSuccess);
    };
  }, [history, props.socket]);

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label>
          <span>Электронная почта: </span>
          <input
            type="text"
            name="email"
            value={loginState.email}
            onChange={(event) => {
              setLoginState({ ...loginState, email: event.target.value });
            }}
          />
        </label>
        <label>
          <span>Пароль: </span>
          <input
            type="password"
            name="password"
            value={loginState.password}
            onChange={(event) => {
              setLoginState({ ...loginState, password: event.target.value });
            }}
          />
        </label>
        <button type="submit">Войти</button>
      </form>
      {loginState.message === "" ? null : <div>{loginState.message}</div>}
    </>
  );
}
