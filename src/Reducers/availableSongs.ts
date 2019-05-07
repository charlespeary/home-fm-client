import { Action, Token, StandardAction, Song } from "../Actions/index";

export function availableSongs(
  state: Song[] = [],
  action: StandardAction<Song[]>
): Song[] {
  switch (action.type) {
    case Action.SAVE_AVAILABLE_SONGS:
      return action.value;
    default:
      return state;
  }
}
