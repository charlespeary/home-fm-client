import { Action, Song, SongReadiness } from "./types";
import { store } from "../Stores/index";
import { setActiveSong } from "./activeSong";
import {
  saveSongsInQueue,
  deleteRecentActiveSongFromQueue,
  toggleQueueSongReadiness
} from "./index";
import { notification } from "antd";
import { toggleSpotifySongReadiness } from "./spotifySongs";
const ip = window.location.hostname;
// experimental
export const ws = new WebSocket(`ws://${ip}:8080/ws/`);

type WSAction = {
  action: string;
  success: boolean;
  value: any;
};

type SocketSuccessfullConection = {
  type: Action.WS_CONNECTION_SUCCESSFULL;
};

type SocketConnectionError = {
  type: Action.WS_CONNECTION_FAILED;
};

export type SocketAction = SocketSuccessfullConection | SocketConnectionError;

function setSocketConnected(): SocketAction {
  return {
    type: Action.WS_CONNECTION_SUCCESSFULL
  };
}

function setSocketError(): SocketAction {
  return {
    type: Action.WS_CONNECTION_FAILED
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

type Data<T> = {
  value: T;
};

type NextSong = {
  next_song: Song;
};

type QueueState = {
  active_song: Song;
  songs_queue: Song[];
};

ws.onmessage = event => {
  const data: WSAction = JSON.parse(event.data);
  switch (data.action) {
    case "next_song":
      const songData: NextSong = data.value;
      const nextSong = songData.next_song;
      notification.open({
        message: "Now playing",
        description: `${nextSong.name} - ${nextSong.artists}`
      });
      handleNextSong(nextSong);
      store.dispatch(deleteRecentActiveSongFromQueue());
      break;
    case "queue_state":
      let queueState: QueueState = data.value;
      const queue: Song[] = queueState.songs_queue;
      store.dispatch(saveSongsInQueue(queue));
      let activeSong: Song = queueState.active_song;
      store.dispatch(setActiveSong(activeSong));
      return;
    case "song_download_finished":
      let downloadedSong: Song = data.value;
      store.dispatch(
        toggleQueueSongReadiness(downloadedSong.id, SongReadiness.READY)
      );
      store.dispatch(
        toggleSpotifySongReadiness(downloadedSong.id, SongReadiness.READY)
      );

      return;
    case "song_download_failed":
      let failedSong: Song = data.value;
      store.dispatch(
        toggleQueueSongReadiness(failedSong.id, SongReadiness.CANT_DOWNLOAD)
      );
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
  thumbnailUrl: string,
  nsfw: boolean
) {
  const data = {
    action: "request_song",
    payload: {
      artists,
      name: songName,
      thumbnail_url: thumbnailUrl,
      nsfw
    }
  };
  ws.send(JSON.stringify(data));
}

export function skipSong() {
  const data = {
    action: "skip_song",
    payload: {}
  };
  ws.send(JSON.stringify(data));
}

function convertSongs(songs: Song[]) {}
