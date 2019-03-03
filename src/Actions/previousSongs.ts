import { Action, StandardAction, Song } from "./index";

export function popSongFromHistory(): StandardAction<Song> {
  // we just want to tell reducer to pop song so we dont need any payload
  return {
    type: Action.POP_SONG,
    value: {} as Song
  };
}

// here we are pushing some song to the history so payload is needed
export function pushSongToHistory(song: Song): StandardAction<Song> {
  return {
    type: Action.PUSH_SONG,
    value: song
  };
}
