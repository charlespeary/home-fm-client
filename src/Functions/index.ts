export type Result<T> = {
  value: T;
  error: boolean;
};

export { getAvailableSongs, spotifyConnection } from "./requests";
export { fetchData } from "./fetchData";
