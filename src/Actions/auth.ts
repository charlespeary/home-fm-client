import {
  Action,
  Token,
  StandardAction,
  TokenStatus,
  TokenFromLocalStorage
} from "./index";
import * as localStorage from "store";
import moment from "moment";
import { isObjectEmpty } from "./index";

function convertToken(token: TokenFromLocalStorage): Token {
  return {
    value: token.value,
    status: token.status,
    createdAt: moment(token.createdAt),
    expiresAt: moment(token.expiresAt)
  };
}

export function getTokenFromLocalStorage(): StandardAction<Token> {
  const token: TokenFromLocalStorage = localStorage.get("token", {});
  if (moment(token.expiresAt).isBefore(moment()) || isObjectEmpty(token)) {
    return {
      value: {
        value: "EXPIRED_TOKEN",
        status: TokenStatus.EXPIRED,
        createdAt: moment(),
        expiresAt: moment()
      },
      type: Action.SAVE_TOKEN
    };
  }
  return {
    value: convertToken(token),
    type: Action.SAVE_TOKEN
  };
}

export function saveToken(token: string): StandardAction<Token> {
  const tokenToSave: Token = {
    value: token,
    status: TokenStatus.OK,
    createdAt: moment(),
    expiresAt: moment().add(3600, "seconds")
  };
  // save token in local storage
  localStorage.set("token", tokenToSave);
  // tell spotifyConnection about new token
  return {
    value: tokenToSave,
    type: Action.SAVE_TOKEN
  };
}

export function deleteToken(): StandardAction<Token> {
  return {
    value: {} as Token,
    type: Action.DELETE_TOKEN
  };
}
