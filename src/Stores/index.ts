export { initialState } from "./initialState";
export { store } from "./store";
import { Token, Album, Song, User } from "../Actions/index";




export interface ReduxState {
    token: Token,
    songs: Song[],
    albums: Album[]
    user: User,
    activeSong: Song
}

export interface Action {

}