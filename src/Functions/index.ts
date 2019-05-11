export type Result<T> = {
  value: T;
  error: boolean;
};

export {
  getAvailableSongs,
  spotifyConnection,
  toggleSongNsfw,
  fetchSpotifyData
} from "./requests";
export { fetchData } from "./fetchData";
