import { readFileSync } from "node:fs";
import { ConvertPuzzleInputToChunks, ElvesSortedByCaloricStorage } from "./lib";

const test_input = readFileSync(__dirname + '/test-input.txt', 'utf8');


describe("--- Day 1: Calorie Counting ---", () => {
  describe("Puzzle 1", () => {
    const puzzle_input = test_input;
    const elven_inventory = ConvertPuzzleInputToChunks(puzzle_input);

    it("should parse data correctly", () =>
      expect(elven_inventory).toStrictEqual([
        [1000, 2000, 3000],
        [4000],
        [5000, 6000],
        [7000, 8000, 9000],
        [10000],
      ]));

    
		const sorted_inventory = ElvesSortedByCaloricStorage(elven_inventory);
    const topElf = sorted_inventory.at(0);

    it("should return 24000", () => expect(topElf).toBe(24000));
  });
});
