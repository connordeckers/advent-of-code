import { GetPuzzleData, Puzzle1, Puzzle2 } from "./lib";

const lines = GetPuzzleData().split("\n");

console.log("First puzzle: %d", Puzzle1(lines));
console.log("Second puzzle: %d", Puzzle2(lines));
