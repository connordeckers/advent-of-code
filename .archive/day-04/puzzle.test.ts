import { GetPuzzleData, Puzzle1, Puzzle2 } from "./lib";

describe("--- Day 4: Cube Conundrum ---", () => {
  const lines = GetPuzzleData().split("\n");

  const test_data: string[] = [
    "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
    "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
    "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
    "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
    "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
    "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
  ];

  const puzzle = [
    { label: "Puzzle 1", testFn: Puzzle1, expected: 13 },
    { label: "Puzzle 2", testFn: Puzzle2, expected: 30 },
  ];

  describe.each(puzzle)("$label", ({ testFn, expected }) => {
    const test_result = testFn(test_data);
    it(`passes the test, returning ${expected}`, () => {
      expect(test_result).toBe(expected);
    });

    if (test_result === expected) {
      it(`passes the puzzle, returning ${testFn(lines)}`, () => {
        expect(true).toBeTruthy();
      });
    } else {
      it.todo(`isn't ready to test the puzzle input yet.`);
    }
  });
});
