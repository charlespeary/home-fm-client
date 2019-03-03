import { Action, Token, StandardAction } from "../Actions/index";

export function token(
  state: Token = {} as Token,
  action: StandardAction<Token>
): Token {
  switch (action.type) {
    case Action.SAVE_TOKEN:
      return action.value;
    case Action.DELETE_TOKEN:
      return action.value;
    case Action.REFRESH_TOKEN:
    default:
      return state;
  }
}
