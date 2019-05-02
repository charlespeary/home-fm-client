import { Moment } from "moment";

export { saveToken, deleteToken, getTokenFromLocalStorage } from "./auth";
export { fetchUserAlbums, getUserAlbums } from "./albums";
export { getUserFavouriteSongs } from "./songs";
export { setActiveSong } from "./activeSong";
export { randomNumber, isObjectEmpty } from "./functions";
export { getUserInformations } from "./user";
export { ws } from "./websocket";
export type Token = {
  value: string;
  status: TokenStatus;
  createdAt: Moment;
  expiresAt: Moment;
};

export type TokenFromLocalStorage = {
  value: string;
  status: TokenStatus;
  createdAt: Date;
  expiresAt: Date;
};

export type User = {
  display_name: string;
};

export type StandardAction<T> = {
  value: T;
  type: Action;
};

export type AddSongs = {
  type: Action.ADD_SONGS_TO_QUEUE;
  songs: Song[];
};

export type ToggleSong = {
  type: Action.TOGGLE_SONG_IN_QUEUE;
  isReady: SongReadiness;
  songName: string;
};

export type SaveSongs = {
  type: Action.SAVE_SONGS_IN_QUEUE;
  songs: Song[];
};

export type DeleteRecentActiveSong = {
  type: Action.DELETE_RECENT_ACTIVE_SONG_FROM_QUEUE;
};

export type SongsQueueAction =
  | SaveSongs
  | AddSongs
  | ToggleSong
  | DeleteRecentActiveSong;

export enum Action {
  // token actions
  SAVE_TOKEN,
  DELETE_TOKEN,
  REFRESH_TOKEN,
  // user actions
  SAVE_USER_PROFILE,
  USER_FETCH_FAILED,
  // albums actions
  SAVE_ALBUMS,
  ALBUMS_FETCH_FAILED,
  // songs actions
  SAVE_SONGS,
  SONGS_FETCH_FAILED,
  // activeSong actions
  SET_ACTIVE_SONG,
  // previous songs
  PUSH_SONG,
  POP_SONG,
  // websocket actions
  WS_CONNECTION_FAILED,
  WS_CONNECTION_SUCCESSFULL,
  // songs state
  SAVE_SONGS_IN_QUEUE,
  ADD_SONGS_TO_QUEUE,
  TOGGLE_SONG_IN_QUEUE,
  DELETE_RECENT_ACTIVE_SONG_FROM_QUEUE,
  // current view,
  SET_VIEW
}

export enum TokenStatus {
  OK,
  INVALID,
  EXPIRED
}

export type Album = {
  name: string;
  id: string;
  images: Image[];
  tracks: Tracks;
};

// request data type to unpack items from axios requests
export type RequestData<T> = {
  items: T[];
};

export type SongContainer = {
  created_at: Date;
  track: PlainSong;
};

export interface SongsRequestData extends RequestData<SongContainer> {
  // total number of songs user added to his library, used for pagination
  total: number;
}

// object containing informations about api to fetch albums songs
export type Tracks = {
  href: string;
  total: number;
};

export type Image = {
  url: string;
};

// plain song object from spotify api
export type PlainSong = {
  href: string;
  name: string;
  artists: Artist[];
  album: Album;
  id: string;
  duration: number;
  formatted_name: string;
  // it's gonna be used in queue to determine whether server downloaded it already or not
  isReady: SongReadiness;
};

export type Song = {
  name: string;
  artists: string;
  id: string;
  duration: number;
  formatted_name: string;
  thumbnail_url: string;
  // it's gonna be used in queue to determine whether server downloaded it already or not
  isReady: SongReadiness;
};

export enum SongReadiness {
  READY,
  NOT_READY,
  CANT_DOWNLOAD
}

export type Artist = {
  name: string;
};

export type SongsState = {
  activeSong: Song;
  previousSongs: Song[];
};

export enum CurrentView {
  SongList = "SongList",
  SongQueue = "SongQueue",
  YoutubeSearch = "YoutubeSearch"
}
