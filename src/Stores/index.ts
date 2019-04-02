export { initialState } from "./initialState";
export { store } from "./store";
import { Token, Album, Song, User, SongsState } from "../Actions/index";

export interface ReduxState {
  token: Token;
  songs: Song[];
  albums: Album[];
  user: User;
  previousSongs: Song[];
  activeSong: Song;
  websocketConnected: boolean;
}
