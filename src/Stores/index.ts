export { initialState } from "./initialState";
export { store } from "./store";
import { Token, Album, Song, User, CurrentView } from "../Actions/index";

export interface ReduxState {
  token: Token;
  songs: Song[];
  albums: Album[];
  user: User;
  previousSongs: Song[];
  activeSong: Song;
  websocketConnected: boolean;
  songsQueue: Song[];
  currentView: CurrentView;
}
