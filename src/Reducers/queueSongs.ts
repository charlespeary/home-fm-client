import { Action, Song } from "../Actions/types";
import { SongsQueueAction } from "../Actions/queueSongs";

export function songsQueue(
  state: Song[] = [],
  action: SongsQueueAction
): Song[] {
  switch (action.type) {
    case Action.ADD_SONGS_TO_QUEUE:
      return state.concat(action.songs);
    case Action.TOGGLE_SONG_IN_QUEUE:
      return state.map((song: Song) => {
        if (song.name == action.songId) {
          return {
            ...song,
            isReady: action.isReady
          };
        } else {
          return song;
        }
      });
    // this overrides whole array of songs
    case Action.SAVE_SONGS_IN_QUEUE:
      return action.songs;
    case Action.DELETE_RECENT_ACTIVE_SONG_FROM_QUEUE:
      if (state.length > 0) {
        return state.slice(1, state.length);
      } else {
        return state;
      }
    default:
      return state;
  }
}
