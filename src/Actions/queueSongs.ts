import { Action, Song, SongReadiness } from "./types";

export type ToggleQueueSongReadiness = {
  type: Action.TOGGLE_QUEUE_SONG_READINESS;
  isReady: SongReadiness;
  // song name + artists separated by ", "
  songFormattedName: string;
};

export type DeleteRecentActiveSong = {
  type: Action.DELETE_RECENT_ACTIVE_SONG_FROM_QUEUE;
};

export type SaveQueueSongs = {
  type: Action.SAVE_SONGS_IN_QUEUE;
  songs: Song[];
};

export type AddSongs = {
  type: Action.ADD_SONGS_TO_QUEUE;
  songs: Song[];
};

export type DeleteSongFromQueue = {
  type: Action.DELETE_SONG_FROM_QUEUE;
  songUuid: string;
};

export type SaveQueueSongUuid = {
  type: Action.SAVE_QUEUE_SONG_UUID;
  uuid: string;
  songFormattedName: string;
};

export type SongsQueueAction =
  | SaveQueueSongs
  | AddSongs
  | ToggleQueueSongReadiness
  | DeleteRecentActiveSong
  | DeleteSongFromQueue
  | SaveQueueSongUuid;

export function addSongsToQueue(songs: Song[]): SongsQueueAction {
  return {
    type: Action.ADD_SONGS_TO_QUEUE,
    songs
  };
}

export function saveSongsInQueue(songs: Song[]): SongsQueueAction {
  return {
    type: Action.SAVE_SONGS_IN_QUEUE,
    songs
  };
}

export function deleteRecentActiveSongFromQueue(): SongsQueueAction {
  return {
    type: Action.DELETE_RECENT_ACTIVE_SONG_FROM_QUEUE
  };
}

export function saveQueueSongUuid(
  songFormattedName: string,
  uuid: string
): SongsQueueAction {
  return {
    type: Action.SAVE_QUEUE_SONG_UUID,
    uuid,
    songFormattedName
  };
}
// toggle song
export function toggleQueueSongReadiness(
  songFormattedName: string,
  isReady: SongReadiness
): SongsQueueAction {
  return {
    type: Action.TOGGLE_QUEUE_SONG_READINESS,
    isReady,
    songFormattedName
  };
}

export function deleteQueueSong(songUuid: string): SongsQueueAction {
  return {
    type: Action.DELETE_SONG_FROM_QUEUE,
    songUuid
  };
}
