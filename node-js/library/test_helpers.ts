import { describe, it, expect } from "bun:test";
import { PuzzleNotYetSolved } from "./helpers";

type TestDefinition<T> = {
  method: (data: T) => number | Promise<number>;
  expected: number;
};

export const BuildPuzzleTests = <T>(
  tests: [TestDefinition<T>, TestDefinition<T>],
  data: T,
) => {
  for (const [idx, test_case] of tests.entries()) {
    describe(`Puzzle ${idx + 1}`, () => {
      it("works with test data", async () => {
        const test_output = await test_case.method.call(test_case, data);
        expect(test_output).toEqual(test_case.expected);
      });
    });
  }
};

