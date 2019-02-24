import { TokenStatus, TokenAction, Action } from "./index";

export function saveToken(token: string): TokenAction {
    return {
        token,
        type: Action.SAVE_TOKEN
    }
}


export function deleteToken(): TokenAction {
    return {
        token : "",
        type: Action.DELETE_TOKEN
    }
}