import { StandardAction, Song, Action } from "../Actions";


export function activeSong(state: Song = {} as Song, action: StandardAction<Song>): Song {
    switch (action.type) {
        case Action.SET_ACTIVE_SONG:
            return action.value;
        default:
            return state;
    }
}