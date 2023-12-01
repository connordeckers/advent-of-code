import { readFileSync } from "node:fs";
import chalk from "chalk";
import { ConvertPuzzleInputToChunks, ElvesSortedByCaloricStorage } from "./lib";

const puzzle_input = readFileSync("./day-01/puzzle-input.txt", "utf8");
const elven_inventory = ConvertPuzzleInputToChunks(puzzle_input);

const sorted_inventory = ElvesSortedByCaloricStorage(elven_inventory);
const topElf = sorted_inventory.at(0);

console.log(chalk.bold.green("--- Day 1: Calorie Counting ---"));
console.log();
console.log(chalk.yellow(`Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?`));
console.log(chalk.green( `The most calories being held is ${chalk.underline.bold(topElf)} calories`))

console.log();
console.log(chalk.dim('-'.repeat(30)));
console.log();


const topThreeElves = sorted_inventory.slice(0, 3);
const totalCaloriesOfTopThree = topThreeElves.reduce((sum, curr) => curr + sum, 0);

console.log(chalk.yellow(`Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?`));
console.log(chalk.green(`The total calories being held by the top three elves is ${chalk.underline.bold(totalCaloriesOfTopThree)} calories`))
