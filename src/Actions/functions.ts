import { Song } from "./types";

// returns a number between min and max range
export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function isObjectEmpty(obj: any) {
  if (obj === null) {
    return true;
  }
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export function getSongFormattedName(song: Song): string {
  return `${song.name} - ${song.artists}`;
}
