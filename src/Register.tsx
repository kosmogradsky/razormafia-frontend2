import * as React from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();

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
      // TODO
      // switch(description) {
      //   case "EMAIL_MUST_BE_STRING":
      // }
    };

    props.socket.on("register error", onRegisterError);

    return () => {
      props.socket.off("register error", onRegisterError);
    };
  }, [props.socket]);
}
