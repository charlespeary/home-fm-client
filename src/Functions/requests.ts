import axios from "axios";
import { store } from "../Stores";
axios.defaults.baseURL = "https://api.spotify.com/v1";

export async function getUserInformations() {
    const token = store.getState().token.value;
    const user = await axios.get("/me", {
        headers: {
            'Authorization': `Bearer  ${token}`
        }
    }).then(response => response.data);
    console.log(user);
    // TODO: FIX EVERYTHING TO BE TYPESCRIPT CONSISTENT
    return user;
}