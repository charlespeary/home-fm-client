import { Action, Song, SongsQueueAction, SongReadiness } from ".";

export function getSongsQueue() {}

export function addSongsToQueue(songs: Song[]): SongsQueueAction {
  return {
    type: Action.ADD_SONGS_TO_QUEUE,
    songs
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
