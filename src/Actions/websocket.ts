import { StandardAction, Action, Song, SongReadiness } from "./index";
import { store } from "../Stores/index";
import { setActiveSong } from "./activeSong";
import {
  toggleSong,
  saveSongsInQueue,
  deleteRecentActiveSongFromQueue
} from "./songsQueue";
import { notification } from "antd";
export const ws = new WebSocket("ws://127.0.0.1:8080/ws/");

type WSAction = {
  action: string;
  success: boolean;
  value: any;
};

type NextSong = {
  name: string;
  duration: number;
  path: string;
};

function setSocketConnected(): StandardAction<boolean> {
  return {
    type: Action.WS_CONNECTION_SUCCESSFULL,
    value: true
  };
}

function setSocketError(): StandardAction<boolean> {
  return {
    type: Action.WS_CONNECTION_FAILED,
    value: false
  };
}

let isSocketOpened = false;

ws.onopen = event => {
  isSocketOpened = true;
  notification.success({
    message: "Connection",
    description: "Successfully connected to the home-fm-server."
  });
  store.dispatch(setSocketConnected());
};

ws.onclose = event => {
  isSocketOpened = false;
  notification.error({
    message: "Connection",
    description: "Diconnected from home-fm-server"
  });
  store.dispatch(setSocketError());
};

ws.onerror = event => {
  notification.error({
    message: "Connection",
    duration: 10,
    description: "home-fm-server isn't turned on"
  });
  store.dispatch(setSocketError());
};

ws.onmessage = event => {
  const data: WSAction = JSON.parse(event.data);
  switch (data.action) {
    case "next_song":
      console.log(data.value);
      notification.open({
        message: "Now playing",
        description: `${data.value.next_song.name} - ${
          data.value.next_song.artists
        }`
      });
      handleNextSong(data.value.next_song as Song);
      store.dispatch(deleteRecentActiveSongFromQueue());
      break;
    case "queue_state":
      const queue: Song[] = data.value.songs_queue;
      store.dispatch(saveSongsInQueue(queue));
      let activeSong: Song = data.value.active_song;
      store.dispatch(setActiveSong(activeSong));
      return;
    case "song_download_finished":
      let downloadedSong: Song = data.value;
      store.dispatch(toggleSong(downloadedSong.name, SongReadiness.READY));
      return;
    case "song_download_failed":
      let failedSong: Song = data.value;
      store.dispatch(toggleSong(failedSong.name, SongReadiness.CANT_DOWNLOAD));
      return;
    case "song_download_started":
      break;
    default:
  }
};

function handleNextSong(song: Song) {
  store.dispatch(setActiveSong(song));
}

export function sendSong(
  songName: string,
  artists: string,
  thumbnailUrl: string
) {
  const data = {
    action: "request_song",
    payload: {
      artists,
      name: songName,
      thumbnail_url: thumbnailUrl
    }
  };
  ws.send(JSON.stringify(data));
}

function convertSongs(songs: Song[]) {}
