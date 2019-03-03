import { Song, User, Token, SongsState } from "../Actions/index";
import { ReduxState } from "./index";

export const initialState: ReduxState = {
  token: <Token>{},
  songs: [],
  user: <User>{},
  albums: [],
  previousSongs: [],
  activeSong: <Song>{}
};
