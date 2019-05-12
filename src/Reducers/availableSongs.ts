import { Action, Song } from "../Actions/types";
import { AvailableSongsAction } from "../Actions/availableSongs";

export function availableSongs(
  state: Song[] = [],
  action: AvailableSongsAction
): Song[] {
  switch (action.type) {
    case Action.SAVE_AVAILABLE_SONGS:
      return action.songs;
    case Action.TOGGLE_AVAILABLE_SONG_NSFW:
      // create new array of songs with song that has nsfw toggled
      return state.map(song => {
        if (parseInt(song.id) === action.songId) {
          return Object.assign({}, song, { nsfw: action.nsfw });
        } else {
          return song;
        }
      });
    default:
      return state;
  }
}
