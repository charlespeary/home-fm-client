import axios from "axios";
import {
  getUserFavouriteSongs,
  getUserInformations,
  toggleAvailableSongNsfw,
  deleteAvailableSong
} from "../Actions/index";
import { Song, Config } from "../Actions/types";
import { store } from "../Stores/index";
import { getUserAlbums } from "../Actions/albums";
import { config } from "./config";
export const spotifyConnection = axios.create({
  baseURL: "https://api.spotify.com/v1"
});

// temp solution, because somehow when I move my config to separate file it won't compile
export const apiConnection = axios.create({
  baseURL: config.api
});

type AvailableSongsResponse = {
  data: Song[];
};

export async function getAvailableSongs() {
  return apiConnection
    .get("/songs")
    .then((res: AvailableSongsResponse) => res.data);
}

export async function toggleSongNsfw(songId: number, isNsfw: boolean) {
  return apiConnection.put<Song>(`/songs/${songId}/${isNsfw}`).then(res => {
    store.dispatch(
      toggleAvailableSongNsfw(parseInt(res.data.id), res.data.nsfw)
    );
  });
}

export async function deleteSong(songId: number) {
  return apiConnection.delete(`/songs/${songId}`).then(res => {
    store.dispatch(deleteAvailableSong(parseInt(res.data.id)));
  });
}

export async function updateConfig(config: Config) {
  return apiConnection.put("/config", config).then(res => {
    console.log(res);
  });
}

// get user data from spotify and save it in the store
export async function fetchSpotifyData() {
  const userInformations = await getUserInformations();
  const userAlbums = await getUserAlbums();
  store.dispatch(userInformations);
  store.dispatch(userAlbums);
  const userSongs = await getUserFavouriteSongs(store.dispatch);
}
