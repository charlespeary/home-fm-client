import { Action, Song } from "../Actions/types";
import { AvailableSongsAction } from "../Actions/availableSongs";

export function availableSongs(
  state: Song[] = [],
  action: AvailableSongsAction
): Song[] {
  switch (action.type) {
    case Action.SAVE_AVAILABLE_SONGS:
      return action.songs;
    default:
      return state;
  }
}
