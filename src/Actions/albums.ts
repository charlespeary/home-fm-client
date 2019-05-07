import { Album, StandardAction, Action, RequestData } from "./index";
import { Result, spotifyConnection } from "../Functions/index";
import { store } from "../Stores/index";

export function saveUserAlbums(albums: Album[]): StandardAction<Album[]> {
  return {
    value: albums,
    type: Action.SAVE_ALBUMS
  };
}

export function albumsFetchFailed(): StandardAction<Album[]> {
  return {
    value: [],
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
