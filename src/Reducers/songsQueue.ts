import { Action, Song, SongsQueueAction } from "../Actions";

export function songsQueue(
  state: Song[] = [],
  action: SongsQueueAction
): Song[] {
  switch (action.type) {
    case Action.ADD_SONGS_TO_QUEUE:
      return state.concat(action.songs);
    case Action.TOGGLE_SONG_IN_QUEUE:
      return state.map((song: Song) => {
        if (song.formatted_name == action.songName) {
          return {
            ...song,
            isReady: action.isReady
          };
        } else {
          return song;
        }
      });
    default:
      return state;
  }
}
