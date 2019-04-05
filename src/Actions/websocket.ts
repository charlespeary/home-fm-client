import { StandardAction, Action, Song, SongReadiness } from "./index";
import { store } from "../Stores/index";
import { setActiveSong } from "./activeSong";
import {
  toggleSong,
  saveSongsInQueue,
  deleteRecentActiveSongFromQueue
} from "./songsQueue";
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

let isSocketOpened = false;

ws.onopen = event => {
  isSocketOpened = true;
  console.log("connected");
  store.dispatch(setSocketConnected());
};

ws.onmessage = event => {
  const data: WSAction = JSON.parse(event.data);
  switch (data.action) {
    case "next_song":
      handleNextSong(data.value.next_song as Song);
      store.dispatch(deleteRecentActiveSongFromQueue());
      break;
    case "queue_state":
      const queue: Song[] = data.value.songs_queue;
      store.dispatch(saveSongsInQueue(queue));
      let activeSong: Song = data.value.active_song;
      store.dispatch(setActiveSong(activeSong, false));
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
  store.dispatch(setActiveSong(song, false));
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
