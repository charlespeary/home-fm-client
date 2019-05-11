import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  token,
  user,
  albums,
  spotifySongs,
  activeSong,
  websocketConnected,
  songsQueue,
  currentView,
  availableSongs
} from "../Reducers/index";
import { initialState } from "./index";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { getAvailableSongs } from "../Functions";
import { saveAvailableSongs } from "../Actions/songsAvailable";

const loggerMiddleware = createLogger();

// make function with initial stuff to do
const app = combineReducers({
  token,
  user,
  albums,
  spotifySongs,
  activeSong,
  websocketConnected,
  songsQueue,
  currentView,
  availableSongs
});

export const store = createStore(
  app,
  initialState,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

// fetch data from API

getAvailableSongs().then(songs => {
  store.dispatch(saveAvailableSongs(songs));
});
