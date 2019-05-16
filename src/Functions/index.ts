export type Result<T> = {
  value: T;
  error: boolean;
};

export {
  getAvailableSongs,
  spotifyConnection,
  toggleSongNsfw,
  fetchSpotifyData,
  deleteSong,
  updateConfig
} from "./requests";
export { fetchData } from "./fetchData";
export { config } from "./config";
