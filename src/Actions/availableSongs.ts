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

export type AvailableSongsAction = SaveAvailableSongs | ToggleAvailableSongNsfw;

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
