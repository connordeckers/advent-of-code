export type CaloricInventory = Array<number[]>;

export const ElvesSortedByCaloricStorage = (stores: CaloricInventory) =>
  stores
    // Sum up the total for each block
    .map((store) => store.reduce((sum, curr) => curr + sum, 0))
    // Sort them from smallest to largest
    .toSorted((a, b) => a - b)
    // Reverse them
    .toReversed()

export const ConvertPuzzleInputToChunks = (puzzle_input: string) =>
  puzzle_input
    .split("\n\n")
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => chunk.split("\n").map(Number));
