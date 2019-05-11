import { Action, User } from "./types";
import { Result, spotifyConnection } from "../Functions/index";
import { store } from "../Stores/index";

type SaveUserData = {
  user: User;
  type: Action.SAVE_USER_PROFILE;
};

type UserFetchFailed = {
  type: Action.USER_FETCH_FAILED;
};

export type UserAction = SaveUserData | UserFetchFailed;

export function saveUserData(user: User): UserAction {
  return {
    user,
    type: Action.SAVE_USER_PROFILE
  };
}

export function userFetchFailed(): UserAction {
  return {
    type: Action.USER_FETCH_FAILED
  };
}

export async function getUserInformations(): Promise<UserAction> {
  const user = await fetchUserInformations();
  if (user.error) {
    return userFetchFailed();
  } else {
    return saveUserData(user.value);
  }
}

export async function fetchUserInformations() {
  const token = store.getState().token.value;
  const user = await spotifyConnection
    .get<User>("/me", {
      headers: {
        Authorization: `Bearer  ${token}`
      }
    })
    .then(response => {
      const { data } = response;
      return { value: data, error: false } as Result<User>;
    })
    .catch(e => {
      return { error: true } as Result<User>;
    });
  return user;
}
