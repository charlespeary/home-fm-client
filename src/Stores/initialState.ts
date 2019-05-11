import { Song, User, Token, CurrentView } from "../Actions/types";
import { ReduxState } from "./index";

export const initialState: ReduxState = {
  token: <Token>{},
  spotifySongs: [],
  user: <User>{},
  albums: [],
  activeSong: <Song>{},
  websocketConnected: false,
  songsQueue: [],
  currentView: CurrentView.AvailableSongs,
  availableSongs: []
};
