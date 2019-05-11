import { Action, TokenStatus, Token, TokenFromLocalStorage } from "./types";
import * as localStorage from "store";
import moment from "moment";
import { isObjectEmpty } from "./index";

export type SaveToken = {
  type: Action.SAVE_TOKEN;
  token: Token;
};
export type DeleteToken = {
  type: Action.DELETE_TOKEN;
};

export type TokenAction = SaveToken | DeleteToken;

function convertToken(token: TokenFromLocalStorage): Token {
  return {
    value: token.value,
    status: token.status,
    createdAt: moment(token.createdAt),
    expiresAt: moment(token.expiresAt)
  };
}

export function getTokenFromLocalStorage(): TokenAction {
  const token: TokenFromLocalStorage = localStorage.get("token", {});
  if (moment(token.expiresAt).isBefore(moment()) || isObjectEmpty(token)) {
    return {
      token: {
        value: "EXPIRED_TOKEN",
        status: TokenStatus.EXPIRED,
        createdAt: moment(),
        expiresAt: moment()
      },
      type: Action.SAVE_TOKEN
    };
  }
  return {
    token: convertToken(token),
    type: Action.SAVE_TOKEN
  };
}

export function saveToken(token: string): TokenAction {
  const tokenToSave: Token = {
    value: token,
    status: TokenStatus.OK,
    createdAt: moment(),
    expiresAt: moment().add(3600, "seconds")
  };
  // save token in local storage
  localStorage.set("token", tokenToSave);
  return {
    token: tokenToSave,
    type: Action.SAVE_TOKEN
  };
}

export function deleteToken(): TokenAction {
  return {
    type: Action.DELETE_TOKEN
  };
}
