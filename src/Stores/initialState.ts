import { TokenStatus, Song, User } from "../Actions/index";
import { ReduxState } from "./index";

export const initialState: ReduxState = {
    token: {
        value: "",
        status: TokenStatus.INVALID,
    },
    songs: [],
    user: <User>{},
    albums: [],
    activeSong: <Song>{}
}