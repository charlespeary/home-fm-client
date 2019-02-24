import { FetchStatus, TokenStatus } from "../Actions/index";
import { ReduxState } from "./index";

export const initialState: ReduxState = {
    token: {
        value: "",
        status: TokenStatus.INVALID,
    },
}