import * as React from "react";
import { Socket } from "socket.io-client";

interface RegisterState {
  email: string;
  password: string;
  repeatPassword: string;
  message: string;
}

export interface RegisterProps {
  socket: Socket;
}

export function Register(props: RegisterProps) {
  const [registerState, setRegisterState] = React.useState<RegisterState>({
    email: "",
    password: "",
    repeatPassword: "",
    message: "",
  });

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (registerState.password !== registerState.repeatPassword) {
        setRegisterState({
          ...registerState,
          message:
            "Пароль и повторение пароля не совпадают. Введите их снова, они должны быть одинаковые.",
        });
        return;
      }

      props.socket.emit(
        "register",
        registerState.email,
        registerState.password
      );
    },
    [registerState, props.socket]
  );

  React.useEffect(() => {
    const onRegisterError = (description: string) => {
      switch (description) {
        case "EMAIL_MUST_BE_STRING": {
          setRegisterState({
            ...registerState,
            message:
              "Мы получили повреждённые данные вместо адреса электронной почты. Попробуйте ввести адрес электронной почты заново.",
          });
          break;
        }
        case "PASSWORD_MUST_BE_STRING": {
          setRegisterState({
            ...registerState,
            message:
              "Мы получили повреждённые данные вместо пароля. Попробуйте ввести пароль заново.",
          });
          break;
        }
        case "EMAIL_NOT_VALID": {
          setRegisterState({
            ...registerState,
            message:
              "То, что вы ввели в адрес электронной почты, не похоже на адрес электронной почты. Пожалуйста, перепроверьте и исправьте ошибку, прежде чем продолжать.",
          });
          break;
        }
        case "PASSWORD_TOO_SHORT": {
          setRegisterState({
            ...registerState,
            message:
              "Ваш пароль слишком короткий. Пожалуйста, придумайте пароль подлиннее.",
          });
          break;
        }
      }
    };

    props.socket.on("register error", onRegisterError);

    return () => {
      props.socket.off("register error", onRegisterError);
    };
  }, [props.socket, registerState]);

  React.useEffect(() => {
    const onRegisterSuccess = () => {
      setRegisterState({
        email: "",
        password: "",
        repeatPassword: "",
        message: "Вы успешно создали пользователя. Теперь можете залогиниться.",
      });
    };

    props.socket.on("register success", onRegisterSuccess);

    return () => {
      props.socket.off("register success", onRegisterSuccess);
    };
  }, [props.socket]);

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label>
          <span>Электронная почта: </span>
          <input
            type="text"
            name="email"
            value={registerState.email}
            onChange={(event) => {
              setRegisterState({ ...registerState, email: event.target.value });
            }}
          />
        </label>
        <label>
          <span>Придумайте пароль: </span>
          <input
            type="password"
            name="password"
            value={registerState.password}
            onChange={(event) => {
              setRegisterState({
                ...registerState,
                password: event.target.value,
              });
            }}
          />
        </label>
        <label>
          <span>Повторите придуманный пароль: </span>
          <input
            type="password"
            name="repeat-password"
            value={registerState.repeatPassword}
            onChange={(event) => {
              setRegisterState({
                ...registerState,
                repeatPassword: event.target.value,
              });
            }}
          />
        </label>
        <button type="submit">Зарегистрироваться</button>
      </form>
      {registerState.message === "" ? null : <div>{registerState.message}</div>}
    </>
  );
}
