import { Action, Song, StandardAction, randomNumber } from "./index";
import { sendSong } from "./websocket";

// if pushToHistory equals true then song will be pushed to previousSongs array
export function setActiveSong(
  song: Song,
  download: boolean
): StandardAction<Song> {
  // whether we want to notify server about incoming song or not
  if (download) {
    sendSong(song.name, song.artists.map(a => a.name));
  }
  return {
    value: song,
    type: Action.SET_ACTIVE_SONG
  };
}
