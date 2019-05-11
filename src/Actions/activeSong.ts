import { Action, Song } from "./types";
import { sendSong } from "./websocket";

export type SetActiveSong = {
  type: Action.SET_ACTIVE_SONG;
  song: Song;
};

export type ActiveSongAction = SetActiveSong;

// if pushToHistory equals true then song will be pushed to previousSongs array
export function setActiveSong(song: Song): ActiveSongAction {
  // whether we want to notify server about incoming song or not
  return {
    song,
    type: Action.SET_ACTIVE_SONG
  };
}

export function scheduleSong(song: Song) {
  sendSong(song.name, song.artists, song.thumbnail_url, song.nsfw);
}
