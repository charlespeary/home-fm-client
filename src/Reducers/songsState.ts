import { Song, Action } from "../Actions/types";
import { ActiveSongAction } from "../Actions/activeSong";

export function activeSong(
  state: Song = {} as Song,
  action: ActiveSongAction
): Song {
  switch (action.type) {
    case Action.SET_ACTIVE_SONG:
      return action.song;
    default:
      return state;
  }
}
