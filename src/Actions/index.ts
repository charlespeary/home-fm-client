export { saveToken, deleteToken } from "./auth";
export { FetchStatus } from "./songs";
export { fetchUserAlbums } from "./albums";

export type Token = {
    value: string,
    status: TokenStatus,
}

export type User = {
    display_name: string;
}

export type UserAction = {
    user: User,
    type: Action
}

export type TokenAction = {
    token: string,
    type: Action,
}

export enum Action {
    SAVE_TOKEN,
    DELETE_TOKEN,
    REFRESH_TOKEN,
    FETCH_USER_PROFILE,
    SAVE_USER_PROFILE,
    USER_FETCH_FAILED
}

export enum TokenStatus {
    OK, INVALID, EXPIRED,
}

export type Album = {
    name: string;

}