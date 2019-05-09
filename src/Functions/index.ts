export type Result<T> = {
  value: T;
  error: boolean;
};

export {
  getAvailableSongs,
  spotifyConnection,
  toggleSongNsfw
} from "./requests";
export { fetchData } from "./fetchData";
