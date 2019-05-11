import { Action, Song, SongsRequestData, Artist, SongReadiness } from "./types";
import { Result, spotifyConnection } from "../Functions/index";
import { store } from "../Stores/index";
import { Dispatch } from "react";
import { AnyAction } from "redux";

type SaveSpotifySongs = {
  type: Action.SAVE_SPOTIFY_SONGS;
  songs: Song[];
};

type SpotifySongsFetchFailed = {
  type: Action.SPOTIFY_SONGS_FETCH_FAILED;
};

type ToggleSpotifySongReadiness = {
  type: Action.TOGGLE_SPOTIFY_SONG_READINESS;
  songId: string;
  readiness: SongReadiness;
};

export type SpotifySongsAction =
  | SaveSpotifySongs
  | SpotifySongsFetchFailed
  | ToggleSpotifySongReadiness;

export function saveSongs(songs: Song[]): SpotifySongsAction {
  return {
    songs,
    type: Action.SAVE_SPOTIFY_SONGS
  };
}

export function songsFetchFailed(): SpotifySongsAction {
  return {
    type: Action.SPOTIFY_SONGS_FETCH_FAILED
  };
}

export function toggleSpotifySongReadiness(
  songId: string,
  readiness: SongReadiness
): SpotifySongsAction {
  return {
    type: Action.TOGGLE_SPOTIFY_SONG_READINESS,
    songId,
    readiness
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
  const songs = await spotifyConnection
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
        const { track } = item;
        const artists = track.artists.map(artist => artist.name).join(", ");
        const isDownloaded = checkIfSongIsDownloaded(track.name, artists);
        return {
          id: track.id,
          name: track.name,
          thumbnail_url: track.album.images[0].url,
          duration: track.duration / 1000,
          formatted_name: formatName(track.name, track.artists),
          isReady: isDownloaded ? SongReadiness.READY : SongReadiness.NOT_READY,
          artists,
          nsfw: true
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

// check if spotify song is already available in the songs downloaded from the server
function checkIfSongIsDownloaded(songName: string, artists: string) {
  const availableSongs = store.getState().availableSongs;
  return (
    availableSongs.filter(song => {
      return song.name === songName && song.artists === artists;
    }).length > 0
  );
}
