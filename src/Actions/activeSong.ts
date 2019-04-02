import { Action, Song, StandardAction, randomNumber } from "./index";
import { store } from "../Stores/index";
import { sendSong } from "./websocket";

// if pushToHistory equals true then song will be pushed to previousSongs array
export function setActiveSong(
  song: Song,
  pushToHistory: boolean
): StandardAction<Song> {
  // push song to previousSongs, so we can know what songs has been played before
  sendSong(song.name, song.artists.map(a => a.name));
  if (pushToHistory) {
    const currentSong = store.getState().activeSong;
    // store.dispatch(pushSongToHistory(currentSong));
  }
  return {
    value: song,
    type: Action.SET_ACTIVE_SONG
  };
}

// if true push to history of previous songs
export function setRandomSong(pushToHistory: boolean): StandardAction<Song> {
  const songs = store.getState().songs;
  let randomSong = songs[randomNumber(0, songs.length)];
  return setActiveSong(randomSong, pushToHistory);
}

// export function setPreviousSong(): StandardAction<Song> {
//   const { previousSongs } = store.getState();
//   const nextSong = [...previousSongs].pop();
//   if (nextSong) {
//     // there was some song, so after it's set to an active one we don't want it in the history anymore
//     store.dispatch(popSongFromHistory());
//     return setActiveSong(nextSong, false);
//   }
//   return setRandomSong(false);
// }
