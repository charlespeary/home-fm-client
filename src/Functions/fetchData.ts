import { getAvailableSongs } from "./requests";

export async function fetchData() {
  console.log("fetching...");
  const availableSongs = await getAvailableSongs();
}
