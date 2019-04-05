import { Action, Song, SongsQueueAction, SongReadiness } from ".";

export function getSongsQueue() {}

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
export function toggleSong(
  songName: string,
  isReady: SongReadiness
): SongsQueueAction {
  return {
    type: Action.TOGGLE_SONG_IN_QUEUE,
    isReady,
    songName
  };
}
