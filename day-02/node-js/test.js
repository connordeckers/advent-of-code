import { play_game, play_game_again } from "./lib.js";

const strategy = ["A Y", "B X", "C Z"];
console.log('Round 1');
play_game(strategy, true);
console.log();
console.log();
console.log();
console.log();
console.log('Round 2');
play_game_again(strategy, true);
