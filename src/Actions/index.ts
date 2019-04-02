import { Moment } from "moment";

export { saveToken, deleteToken, getTokenFromLocalStorage } from "./auth";
export { fetchUserAlbums, getUserAlbums } from "./albums";
export { getUserFavouriteSongs } from "./songs";
export { setActiveSong, setRandomSong } from "./activeSong";
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
  WS_CONNECTION_SUCCESSFULL
}

export enum TokenStatus {
  OK,
  INVALID,
  EXPIRED
}

export type Album = {
  name: string;
  collaborative: boolean;
  href: string;
  id: string;
  images: Image[];
  owner: User;
  primary_color: string;
  public: boolean;
  type: string;
  uri: string;
  tracks: Tracks;
};

// request data type to unpack items from axios requests
export type RequestData<T> = {
  items: T[];
};

export type SongContainer = {
  created_at: Date;
  track: Song;
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
  height: number;
  widht: number;
  url: string;
};

export type Song = {
  href: string;
  name: string;
  preview_url: string;
  uri: string;
  artists: Artist[];
  album: Album;
  id: string;
  duration_ms: number;
};

export type Artist = {
  name: string;
};

export type SongsState = {
  activeSong: Song;
  previousSongs: Song[];
};
