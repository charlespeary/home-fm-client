import { Action, Token } from "../Actions/types";
import { TokenAction } from "../Actions/auth";

export function token(state: Token = {} as Token, action: TokenAction): Token {
  switch (action.type) {
    case Action.SAVE_TOKEN:
      return action.token;
    case Action.DELETE_TOKEN:
      return {} as Token;
    default:
      return state;
  }
}
