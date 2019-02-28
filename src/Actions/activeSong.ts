import { Action, Song, StandardAction } from "./index";


export function setActiveSong(song: Song): StandardAction<Song> {
    return {
        value: song,
        type: Action.SET_ACTIVE_SONG
    }
}
