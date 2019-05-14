import { Moment } from "moment";
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

export type Album = {
  name: string;
  id: string;
  images: Image[];
  tracks: Tracks;
};

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

export type Song = {
  name: string;
  artists: string;
  id: string;
  duration: number;
  formatted_name: string;
  thumbnail_url: string;
  // it's gonna be used in queue to determine whether server downloaded it already or not
  isReady: SongReadiness;
  nsfw: boolean;
  uuid?: string;
};

export type Artist = {
  name: string;
};

export type User = {
  display_name: string;
};

export type RequestData<T> = {
  items: T[];
};

export type SongsState = {
  activeSong: Song;
  previousSongs: Song[];
};

// ################## ENUMS ##################

export enum SongReadiness {
  READY,
  NOT_READY,
  CANT_DOWNLOAD,
  DOWNLOADING
}

export enum CurrentView {
  SpotifySongs = "SpotifySongs",
  QueueSongs = "QueueSongs",
  AvailableSongs = "AvailableSongs",
  YoutubeSearch = "YoutubeSearch",
  Config = "Config"
}

export enum TokenStatus {
  OK,
  INVALID,
  EXPIRED
}

export enum Action {
  // token actions
  SAVE_TOKEN,
  DELETE_TOKEN,
  REFRESH_TOKEN,
  // user actions
  SAVE_USER_PROFILE,
  USER_FETCH_FAILED,
  // albums actions
  SAVE_USER_ALBUMS,
  ALBUMS_FETCH_FAILED,
  // songs actions
  SAVE_SONGS,
  SPOTIFY_SONGS_FETCH_FAILED,
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
  SET_VIEW,
  // save available songs
  SAVE_AVAILABLE_SONGS,
  // toggle song readiness,
  SAVE_SPOTIFY_SONGS,
  //
  TOGGLE_SPOTIFY_SONG_READINESS,
  TOGGLE_QUEUE_SONG_READINESS,
  TOGGLE_AVAILABLE_SONG_NSFW,
  DELETE_SONG_FROM_QUEUE,
  OVERWRITE_QUEUE_SONG,
  SAVE_QUEUE_SONG_UUID,
  DELETE_AVAILABLE_SONG
}
