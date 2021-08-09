export interface LoadedUserState {
  type: "LoadedUserState";
  user: {
    email: string;
    uid: string;
  };
}

export interface LoadingUserState {
  type: "LoadingUserState";
}

export interface WithoutUserState {
  type: "WithoutUserState";
}

export type UserState = LoadedUserState | LoadingUserState | WithoutUserState;
