import {
  Album,
  StandardAction,
  Action,
  Song,
  SongsRequestData,
  Artist
} from "./index";
import { Result, axios } from "../Functions/index";
import { store } from "../Stores/index";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export function saveSongs(songs: Song[]): StandardAction<Song[]> {
  return {
    value: songs,
    type: Action.SAVE_SONGS
  };
}

export function songsFetchFailed(): StandardAction<Album[]> {
  return {
    value: [],
    type: Action.SONGS_FETCH_FAILED
  };
}

type PaginationStatus = {
  // total number of songs available
  total: number;
  // number of songs already downloaded
  offset: number;
  firstFetch: boolean;
};

function formatName(name: string, artists: Artist[]) {
  return `${name} - ${artists.map(artist => artist.name).join(", ")}`;
}

export async function fetchUserSongs(paginationStatus: PaginationStatus) {
  const token = store.getState().token.value;

  // total number of songs
  let total = 0;
  const songs = await axios
    .get<SongsRequestData>(
      `/me/tracks?limit=50&offset=${paginationStatus.offset}`,
      {
        headers: {
          Authorization: `Bearer  ${token}`
        }
      }
    )
    .then(response => {
      const { data } = response;
      total = data.total;
      // unwrap songs from song containers
      const songs: Song[] = data.items.map(item => {
        return {
          ...item.track,
          formatted_name: formatName(item.track.name, item.track.artists)
        };
      });
      return { value: songs, error: false } as Result<Song[]>;
    })
    .catch(e => {
      return { error: true } as Result<Song[]>;
    });

  // calculate next offset based on the previous ones and number of songs that we just fetched
  return { songs, total, offset: paginationStatus.offset + songs.value.length };
}

export async function getUserFavouriteSongs(dispatch: Dispatch<AnyAction>) {
  let paginationStatus: PaginationStatus = {
    total: 0,
    offset: 0,
    firstFetch: true
  };
  let songs: Song[] = [];

  // fetch songs until all of
  while (
    paginationStatus.offset < paginationStatus.total ||
    paginationStatus.firstFetch
  ) {
    // fetch next chunk of songs, function might only download 50 songs at once
    const songsChunk = await fetchUserSongs(paginationStatus);
    // throw an error action in case of errors
    if (songsChunk.songs.error) {
      dispatch(songsFetchFailed());
    } else {
      // set new pagination status with new offset which is an index from where next function will start fetching new songs
      paginationStatus = {
        offset: songsChunk.offset,
        total: songsChunk.total,
        firstFetch: false
      };
      songs = songs.concat(songsChunk.songs.value);
      dispatch(saveSongs(songs));
    }
  }
}
