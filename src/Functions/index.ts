export type Result<T> = {
  value: T;
  error: boolean;
};

export {
  getAvailableSongs,
  spotifyConnection,
  toggleSongNsfw,
  fetchSpotifyData,
  deleteSong
} from "./requests";
export { fetchData } from "./fetchData";
