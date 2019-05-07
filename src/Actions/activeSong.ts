import { Action, Song, StandardAction, randomNumber } from "./index";
import { sendSong } from "./websocket";

// if pushToHistory equals true then song will be pushed to previousSongs array
export function setActiveSong(song: Song): StandardAction<Song> {
  // whether we want to notify server about incoming song or not
  return {
    value: song,
    type: Action.SET_ACTIVE_SONG
  };
}

export function scheduleSong(song: Song) {
  sendSong(song.name, song.artists, song.thumbnail_url, song.nsfw);
}
