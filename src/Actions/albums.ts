import { Album } from "./index";
import { Result, axios } from "../Functions/index";
import { store } from "../Stores/index";

export async function fetchUserAlbums() {
    const token = store.getState().token.value;
    const user = await axios.get<Album>("/me/playlists", {
        headers: {
            'Authorization': `Bearer  ${token}`
        }
    }).then((response) => {
        const { data } = response;
        return { value: data, error: false } as Result<Album>;
    }).catch(e => { return { error: true } as Result<Album> });
    return user as any;
}