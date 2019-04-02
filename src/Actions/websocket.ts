import { StandardAction, Action, Song } from "./index";
import { store } from "../Stores/index";
import { setActiveSong } from "./activeSong";
import { formatArtists } from "../Components/Presentational";
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
  console.log(data);
  switch (data.action) {
    case "next_song":
      handleNextSong(data.value as NextSong);
    case "song_download_success":
      console.log("Downloaded song : ", data.value);
    case "song_download_failure":
    case "song_download_started":

    default:
  }
};

function handleNextSong(song: NextSong) {
  // store.dispatch(setActiveSong(song as Song, false));
}

export function sendSong(songName: string, artists: string[]) {
  const data = {
    action: "request_song",
    payload: {
      artists,
      name: songName
    }
  };
  ws.send(JSON.stringify(data));
}
