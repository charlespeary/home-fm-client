import { getAvailableSongs } from "./requests";

export async function fetchData() {
  const availableSongs = await getAvailableSongs();
}
