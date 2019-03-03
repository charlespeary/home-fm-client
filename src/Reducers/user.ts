import { Action, User, StandardAction } from "../Actions/index";
export function user(
  state: User = {} as User,
  action: StandardAction<User>
): User {
  switch (action.type) {
    case Action.SAVE_USER_PROFILE:
      return action.value;
    case Action.USER_FETCH_FAILED:
    default:
      return state;
  }
}
