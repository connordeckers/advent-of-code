import { readFileSync } from "node:fs";
export const GetPuzzleData = (): string =>
  readFileSync(`${__dirname}/puzzle-input.txt`, "utf8").trim();

