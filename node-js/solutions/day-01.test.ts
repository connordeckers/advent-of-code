import { Puzzle1, Puzzle2 } from "../library/day/01";

describe("--- Day 1: Trebuchet?! ---", () => {
  describe("Puzzle 1", () => {
    const test_data = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
    it("should return the sum of 142", () =>
      expect(Puzzle1(test_data)).toBe(142));
  });

  describe("Puzzle 2", () => {
    const test_data = [
      "two1nine",
      "eightwothree",
      "abcone2threexyz",
      "xtwone3four",
      "4nineeightseven2",
      "zoneight234",
      "7pqrstsixteen",
    ];

    it("should return the sum of 281", () =>
      expect(Puzzle2(test_data)).toBe(281));
  });
});
