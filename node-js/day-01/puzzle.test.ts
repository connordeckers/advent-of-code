import { GetTotalSum, GetDigitsOfLine } from "./lib";

describe("--- Day 1: Trebuchet?! ---", () => {
  describe("Puzzle 1", () => {
    const test_data = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
    const digits_in_line = test_data.map(row => GetDigitsOfLine(row, true));
    const total_sum = GetTotalSum(digits_in_line);

    it("should return the sum of 142", () => expect(total_sum).toBe(142));
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
    
    const digits_in_line = test_data.map(row => GetDigitsOfLine(row, false));
    const total_sum = GetTotalSum(digits_in_line);
    
		it("should return the sum of 281", () => expect(total_sum).toBe(281));
  });
});
