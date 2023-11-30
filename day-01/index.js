const fs = require('node:fs');

const sum = (sum, curr) => curr + sum;

const chunks = fs.readFileSync('./puzzle-input.txt', 'utf8').split('\n\n');
const elves = chunks.map(chunk => chunk.split('\n').map(Number).reduce(sum, 0));

const elvesSortedByCalories = [...elves].sort().reverse();
const topElf = elvesSortedByCalories.at(0);

console.log(topElf)

const topThreeElves = elvesSortedByCalories.slice(0,3);
const totalCaloriesOfTopThree = topThreeElves.reduce(sum, 0);

console.log(totalCaloriesOfTopThree)
