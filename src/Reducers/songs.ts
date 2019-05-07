import { Action, Song, StandardAction } from "../Actions/index";
export function spotifySongs(
  state: Song[] = [],
  action: StandardAction<Song[]>
): Song[] {
  switch (action.type) {
    case Action.SAVE_SONGS:
      return action.value;
    case Action.SONGS_FETCH_FAILED:
      return [];
    default:
      return state;
  }
}
