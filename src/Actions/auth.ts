import { TokenStatus, TokenAction, Action } from "./index";
import * as store from "store";


export function getTokenFromLocalStorage(): TokenAction {
    const token = store.get("token", "");
    return {
        token,
        type: Action.SAVE_TOKEN
    }
}

export function saveToken(token: string): TokenAction {
    // save token in local storage
    store.set("token", token);
    return {
        token,
        type: Action.SAVE_TOKEN
    }
}


export function deleteToken(): TokenAction {
    return {
        token: "",
        type: Action.DELETE_TOKEN
    }
}