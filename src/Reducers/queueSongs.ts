import { Action, Song } from "../Actions/types";
import { SongsQueueAction } from "../Actions/queueSongs";
import { getSongFormattedName } from "../Actions";

export function songsQueue(
  state: Song[] = [],
  action: SongsQueueAction
): Song[] {
  switch (action.type) {
    case Action.ADD_SONGS_TO_QUEUE:
      return state.concat(action.songs);
    case Action.TOGGLE_QUEUE_SONG_READINESS:
      return state.map((song: Song) => {
        if (song.formatted_name == action.songFormattedName) {
          return {
            ...song,
            isReady: action.isReady
          };
        } else {
          return song;
        }
      });
    case Action.SAVE_QUEUE_SONG_UUID:
      return state.map(song => {
        if (getSongFormattedName(song) === action.songFormattedName) {
          return Object.assign({}, song, { uuid: action.uuid });
        } else {
          return song;
        }
      });
    case Action.DELETE_SONG_FROM_QUEUE:
      return state.filter(song => song.uuid !== action.songUuid);
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
