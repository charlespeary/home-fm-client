import axios from "./requests";

export { axios };


export type Result<T> = {
    value: T,
    error: boolean
}

