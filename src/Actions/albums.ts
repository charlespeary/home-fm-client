import { Action, RequestData, Album } from "./types";
import { Result, spotifyConnection } from "../Functions/index";
import { store } from "../Stores/index";

type SaveUserAlbums = {
  type: Action.SAVE_USER_ALBUMS;
  albums: Album[];
};

type AlbumsFetchFailed = {
  type: Action.ALBUMS_FETCH_FAILED;
};

export type AlbumsAction = SaveUserAlbums | AlbumsFetchFailed;

export function saveUserAlbums(albums: Album[]): AlbumsAction {
  return {
    albums,
    type: Action.SAVE_USER_ALBUMS
  };
}

export function albumsFetchFailed(): AlbumsAction {
  return {
    type: Action.ALBUMS_FETCH_FAILED
  };
}

export async function fetchUserAlbums() {
  const token = store.getState().token.value;
  const albums = await spotifyConnection
    .get<RequestData<Album>>("/me/playlists", {
      headers: {
        Authorization: `Bearer  ${token}`
      }
    })
    .then(response => {
      const { data } = response;
      return { value: data.items, error: false } as Result<Album[]>;
    })
    .catch(e => {
      return { error: true } as Result<Album[]>;
    });
  return albums;
}

export async function getUserAlbums() {
  const albums = await fetchUserAlbums();
  if (albums.error) {
    return albumsFetchFailed();
  } else {
    return saveUserAlbums(albums.value);
  }
}
