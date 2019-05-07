import { Song, StandardAction, Action } from "./index";

// save all songs that radio knows of
export function saveAvailableSongs(
  availableSongs: Song[]
): StandardAction<Song[]> {
  return {
    type: Action.SAVE_AVAILABLE_SONGS,
    value: availableSongs
  };
}

function fetchAvailableSongs() {
  const x = `${process.env.ADDRESS}:${process.env.port}`;
  console.log(x);
}
