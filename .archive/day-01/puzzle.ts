import { GetTotalSum, GetDigitsOfLine, GetPuzzleData } from "./lib";

const lines = GetPuzzleData().split("\n");

console.log(
  "First puzzle: %d",
  GetTotalSum(lines.map((row) => GetDigitsOfLine(row, true))),
);

console.log(
  "Second puzzle: %d",
  GetTotalSum(lines.map((row) => GetDigitsOfLine(row, false))),
);
