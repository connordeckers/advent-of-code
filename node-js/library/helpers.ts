import chalk from "chalk";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
export const GetPuzzleData = (day: number): string =>
  readFileSync(
    resolve(
      __dirname,
      "../puzzle-inputs/",
      `day-${day.toString().padStart(2, "0")}.txt`,
    ),
    "utf8",
  ).trim();

export function* range(start: number, end: number, inclusive: boolean = true) {
  if (inclusive) for (let i = start; i <= end; i++) yield i;
  else for (let i = start; i < end; i++) yield i;
}

export class PuzzleNotYetSolved extends Error {
  constructor() {
    super("Puzzle not yet solved.");
  }
}

export const BuildPuzzleSolutions = async <T>(
  puzzles: Array<(data: T) => any>,
  puzzle_data: T,
) => {
  for (const [idx, puzzle] of puzzles.entries()) {
    try {
      const solution = await puzzle(puzzle_data);
      console.log(
        chalk.green(`The answer to Puzzle ${idx + 1} is`),
        chalk.green.bold(solution),
      );
    } catch (err) {
      if (err instanceof PuzzleNotYetSolved) {
        console.log(chalk.yellow.dim("⚠ Puzzle not yet solved."));
      } else {
        console.log(chalk.red.dim(""), err);
      }
    }
  }
};
