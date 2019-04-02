import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  token,
  user,
  albums,
  songs,
  activeSong,
  websocketConnected
} from "../Reducers/index";
import { initialState } from "./index";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger();

const app = combineReducers({
  token,
  user,
  albums,
  songs,
  activeSong,
  websocketConnected
});

export const store = createStore(
  app,
  initialState,
  applyMiddleware(loggerMiddleware, thunkMiddleware)
);
