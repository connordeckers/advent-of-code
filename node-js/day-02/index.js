import { readFileSync } from "node:fs";
import { play_game, play_game_again } from "./lib.js";

const puzzle_input = readFileSync("./puzzle-input.txt", "utf8");
const strategy = puzzle_input.split('\n').filter(v => v.trim().length > 0);

console.log('Round 1');
play_game(strategy, false);
console.log();
console.log('Round 2');
play_game_again(strategy, false);
