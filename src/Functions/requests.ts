import axios from "axios";
import { Song } from "../Actions/index";
export const spotifyConnection = axios.create({
  baseURL: "https://api.spotify.com/v1"
});

// temp solution, because somehow when I move my config to separate file it won't compile
export const apiConnection = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "http://192.168.1.48:8080"
});

type AvailableSongsResponse = {
  data: Song[];
};

export async function getAvailableSongs() {
  return apiConnection
    .get("/songs")
    .then((res: AvailableSongsResponse) => res.data);
}
