import { Action, Song } from "../Actions/types";
import { SpotifySongsAction } from "../Actions/spotifySongs";

export function spotifySongs(
  state: Song[] = [],
  action: SpotifySongsAction
): Song[] {
  switch (action.type) {
    case Action.SAVE_SPOTIFY_SONGS:
      return action.songs;
    case Action.SPOTIFY_SONGS_FETCH_FAILED:
      return [];
    case Action.TOGGLE_SPOTIFY_SONG_READINESS:
      // find song with given ID and change it's readiness
      return state.map(song => {
        if (song.formatted_name === action.songFormattedName) {
          return Object.assign({}, song, { isReady: action.readiness });
        } else {
          return song;
        }
      });
    default:
      return state;
  }
}
