import { StandardAction, Song, Action, SongsState } from "../Actions";

// export function songsState(
//   state: SongsState = {
//     activeSong: {} as Song,
//     previousSongs: []
//   },
//   action: StandardAction<Song>
// ): SongsState {
//   switch (action.type) {
//     case Action.SET_ACTIVE_SONG:
//       return {
//         activeSong: action.value,
//         previousSongs: state.previousSongs.concat(action.value)
//       };
//     case Action.SET_PREVIOUS_SONG:
//       const { previousSongs } = state;
//       // return array of previousSongs reduced by the last element.
//       // If any undefined value occurs while slicing it will mean that array is empty therefore return an empty array
//       return {
//         activeSong: action.value,
//         previousSongs: previousSongs.slice(0, previousSongs.length - 1) || []
//       };
//     default:
//       return state;
//   }
// }

export function activeSong(
  state: Song = {} as Song,
  action: StandardAction<Song>
): Song {
  switch (action.type) {
    case Action.SET_ACTIVE_SONG:
      return action.value;
    default:
      return state;
  }
}

export function previousSongs(
  state: Song[] = [],
  action: StandardAction<Song>
): Song[] {
  switch (action.type) {
    case Action.PUSH_SONG:
      return state.concat(action.value);
    case Action.POP_SONG:
      return [...state].slice(0, state.length - 1) || [];
    default:
      return state;
  }
}
