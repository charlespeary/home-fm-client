import { Action, User, StandardAction } from "./index";
import { Result, axios } from "../Functions/index";
import { store } from "../Stores/index";

export function saveUserData(user: User): StandardAction<User> {
  return {
    value: user,
    type: Action.SAVE_USER_PROFILE
  };
}

export function userFetchFailed(): StandardAction<User> {
  return {
    value: { display_name: "" },
    type: Action.USER_FETCH_FAILED
  };
}

export async function getUserInformations(): Promise<StandardAction<User>> {
  const user = await fetchUserInformations();
  if (user.error) {
    return userFetchFailed();
  } else {
    return saveUserData(user.value);
  }
}

export async function fetchUserInformations() {
  const token = store.getState().token.value;
  const user = await axios
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
