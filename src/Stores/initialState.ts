import { Song, User, Token } from "../Actions/index";
import { ReduxState } from "./index";

export const initialState: ReduxState = {
  token: <Token>{},
  songs: [],
  user: <User>{},
  albums: [],
  previousSongs: [],
  activeSong: <Song>{},
  websocketConnected: false,
  songsQueue: []
};
