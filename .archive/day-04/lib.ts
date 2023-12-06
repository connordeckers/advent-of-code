import { readFileSync } from "node:fs";
export const GetPuzzleData = (): string =>
  readFileSync(`${__dirname}/puzzle-input.txt`, "utf8").trim();

function* range(start: number, end: number, inclusive: boolean = true) {
  if (inclusive) for (let i = start; i <= end; i++) yield i;
  else for (let i = start; i < end; i++) yield i;
}

