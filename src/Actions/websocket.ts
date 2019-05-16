import { Action, Song, SongReadiness } from "./types";
import { store } from "../Stores/index";
import {
  setActiveSong,
  deleteQueueSong,
  toggleSpotifySongReadiness
} from "./index";
import {
  saveSongsInQueue,
  deleteRecentActiveSongFromQueue,
  toggleQueueSongReadiness
} from "./index";
import { notification } from "antd";
import { addSongsToQueue } from "./queueSongs";
import { config } from "../Functions";
// experimental
export let ws = new WebSocket(config.websocket);

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

type ScheduledSong = {
  song: Song;
  uuid: string;
  // there is also requested_at, but we don't need it atm.
};

type QueueState = {
  active_song: Song;
  songs_queue: ScheduledSong[];
};

// it needs to be simplified
ws.onmessage = event => {
  const data: WSAction = JSON.parse(event.data);
  switch (data.action) {
    case "next_song":
      const songData: NextSong = data.value;
      // imit formatted name
      const nextSong: Song = {
        ...songData.next_song,
        formatted_name: `${songData.next_song.name} - ${
          songData.next_song.artists
        }`
      };
      notification.open({
        message: "Now playing",
        description: `${nextSong.name} - ${nextSong.artists}`
      });
      handleNextSong(nextSong);
      store.dispatch(deleteRecentActiveSongFromQueue());
      break;
    case "queue_state":
      let queueState: QueueState = data.value;
      const queue = queueState.songs_queue;
      const queueSongs = queue.map(scheduledSong => {
        return Object.assign({}, scheduledSong.song, {
          uuid: scheduledSong.uuid
        });
      });
      store.dispatch(saveSongsInQueue(queueSongs));
      let activeSong: Song = queueState.active_song;
      store.dispatch(setActiveSong(activeSong));
      return;
    case "song_download_finished":
      const downloadedSongData: Data<ScheduledSong> = data;
      // imit formatted name
      const songFormattedName = `${downloadedSongData.value.song.name} - ${
        downloadedSongData.value.song.artists
      }`;
      const { song } = downloadedSongData.value;
      const songToSave = { ...song, uuid: downloadedSongData.value.uuid };
      //  store.dispatch(
      //    toggleQueueSongReadiness(songFormattedName, SongReadiness.READY)
      //   );
      // store.dispatch(saveQueueSongUuid(songFormattedName, uuid));
      store.dispatch(addSongsToQueue([songToSave]));
      store.dispatch(
        toggleSpotifySongReadiness(songFormattedName, SongReadiness.READY)
      );

      return;
    case "song_download_failed":
      let failedSong: Song = data.value;
      store.dispatch(
        toggleQueueSongReadiness(
          failedSong.formatted_name,
          SongReadiness.CANT_DOWNLOAD
        )
      );
      store.dispatch(
        toggleSpotifySongReadiness(
          failedSong.formatted_name,
          SongReadiness.CANT_DOWNLOAD
        )
      );
      return;
    case "delete_song_from_queue":
      // data containing deleted song's uuid
      const deletedSongData: Data<string> = data;
      store.dispatch(deleteQueueSong(deletedSongData.value));
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

export function deleteSongFromQueue(songUuid: string) {
  const data = {
    action: "delete_song_from_queue",
    payload: {
      uuid: songUuid
    }
  };
  ws.send(JSON.stringify(data));
}

function convertSongs(songs: Song[]) {}
