import { Action, TokenAction, saveToken, TokenStatus, Token } from "../Actions/index";
export function token(state: Token = { value: "", status: TokenStatus.INVALID }, action: TokenAction): Token {
    switch (action.type) {
        case Action.SAVE_TOKEN:
            return {
                value: action.token,
                status: TokenStatus.OK
            }
        case Action.DELETE_TOKEN:
            return {
                value: action.token,
                status: TokenStatus.INVALID
            }
        case Action.REFRESH_TOKEN:

        default:
            return state;

    }
}
