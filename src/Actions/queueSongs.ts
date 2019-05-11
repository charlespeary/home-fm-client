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

export type SongsQueueAction =
  | SaveQueueSongs
  | AddSongs
  | ToggleQueueSongReadiness
  | DeleteRecentActiveSong;

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
