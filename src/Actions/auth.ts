import { Action, Token, StandardAction, TokenStatus, TokenFromLocalStorage } from "./index";
import * as store from "store";
import moment from "moment";

function convertToken(token: TokenFromLocalStorage): Token {
    return {
        value: token.value,
        status: token.status,
        createdAt: moment(token.createdAt),
        expiresAt: moment(token.expiresAt),
    }
}

export function getTokenFromLocalStorage(): StandardAction<Token> {
    const token: TokenFromLocalStorage = store.get("token", {});
    if (moment(token.expiresAt).isBefore(moment())) {
        return {
            value: {
                value: "EXPIRED_TOKEN",
                status: TokenStatus.EXPIRED,
                createdAt: moment(),
                expiresAt: moment()
            },
            type: Action.SAVE_TOKEN
        }
    }
    return {
        value: convertToken(token),
        type: Action.SAVE_TOKEN
    }
}

export function saveToken(token: string): StandardAction<Token> {
    const tokenToSave: Token = {
        value: token,
        status: TokenStatus.OK,
        createdAt: moment(),
        expiresAt: moment().add(3600, "seconds")
    };
    // save token in local storage
    store.set("token", tokenToSave);
    return {
        value: tokenToSave,
        type: Action.SAVE_TOKEN
    }
}


export function deleteToken(): StandardAction<Token> {
    return {
        value: {} as Token,
        type: Action.DELETE_TOKEN
    }
}