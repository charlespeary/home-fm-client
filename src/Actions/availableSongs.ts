import { Song, Action } from "./types";

type SaveAvailableSongs = {
  type: Action.SAVE_AVAILABLE_SONGS;
  songs: Song[];
};

export type AvailableSongsAction = SaveAvailableSongs;

// save all songs that radio knows of
export function saveAvailableSongs(songs: Song[]): AvailableSongsAction {
  return {
    type: Action.SAVE_AVAILABLE_SONGS,
    songs
  };
}
