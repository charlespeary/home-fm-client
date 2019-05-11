import { Action, Album } from "../Actions/types";
import { AlbumsAction } from "../Actions/albums";

export function albums(state: Album[] = [], action: AlbumsAction): Album[] {
  switch (action.type) {
    case Action.SAVE_USER_ALBUMS:
      return action.albums;
    case Action.ALBUMS_FETCH_FAILED:
      return [];
    default:
      return state;
  }
}
