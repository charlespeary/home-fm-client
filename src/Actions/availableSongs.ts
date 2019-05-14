import { Song, Action } from "./types";

type SaveAvailableSongs = {
  type: Action.SAVE_AVAILABLE_SONGS;
  songs: Song[];
};

type ToggleAvailableSongNsfw = {
  type: Action.TOGGLE_AVAILABLE_SONG_NSFW;
  songId: number;
  nsfw: boolean;
};

type DeleteAvailableSong = {
  type: Action.DELETE_AVAILABLE_SONG;
  songId: number;
};

export type AvailableSongsAction =
  | SaveAvailableSongs
  | ToggleAvailableSongNsfw
  | DeleteAvailableSong;

// save all songs that radio knows of
export function saveAvailableSongs(songs: Song[]): AvailableSongsAction {
  return {
    type: Action.SAVE_AVAILABLE_SONGS,
    songs
  };
}

//
export function toggleAvailableSongNsfw(
  songId: number,
  nsfw: boolean
): AvailableSongsAction {
  return {
    type: Action.TOGGLE_AVAILABLE_SONG_NSFW,
    songId,
    nsfw
  };
}

export function deleteAvailableSong(songId: number): AvailableSongsAction {
  return {
    type: Action.DELETE_AVAILABLE_SONG,
    songId
  };
}
