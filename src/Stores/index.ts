export { initialState } from "./initialState";
export { store } from "./store";
import { Token, Album, Song, User, CurrentView } from "../Actions/types";

export interface ReduxState {
  token: Token;
  // available songs fetched from user's spotify
  spotifySongs: Song[];
  albums: Album[];
  user: User;
  activeSong: Song;
  // to determine whether client connected to websocket or not
  websocketConnected: boolean;
  // songs currently queued to be played in radio
  songsQueue: Song[];
  // currently selected view
  // e.g songs from spotify, songs from radio
  currentView: CurrentView;
  // songs that are currently saved in radio's db
  availableSongs: Song[];
}
