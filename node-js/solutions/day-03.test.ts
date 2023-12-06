import { Puzzle1, Puzzle2 } from "../library/day/03";

const test_data: string[] = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
];

describe("--- Day 3: Gear Ratios ---", () => {
  describe("Puzzle 1", () => {
    it.skip("should return the value 4361", () =>
      expect(Puzzle1(test_data)).toBe(4361));
  });

  describe("Puzzle 2", () => {
    it.skip("should return the value 467835", () =>
      expect(Puzzle2(test_data)).toBe(467835));
  });
});
