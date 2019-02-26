import { Action, Album, StandardAction } from "../Actions/index";
export function albums(state: Album[] = [], action: StandardAction<Album[]>): Album[] {
    switch (action.type) {
        case Action.SAVE_ALBUMS:
            return action.value;
        case Action.ALBUMS_FETCH_FAILED:
            return []
        default:
            return state;

    }
}
