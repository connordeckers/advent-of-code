import { range } from "../helpers";

type Card = {
  card_number: number;
  winning_numbers: number[];
  uncovered_numbers: number[];
  matching_numbers: number;
};

const parse_game = (line: string): Card => {
  const [card, numbers] = line.split(":").map((chunk) => chunk.trim());
  const card_number = parseInt(card.trim().split(" ").at(-1)!);

  const [winning_numbers, uncovered_numbers] = numbers.split("|").map((chunk) =>
    chunk
      .split(" ")
      .filter((v) => v.trim())
      .map(Number),
  );

  const matching_numbers = winning_numbers.filter((num) =>
    uncovered_numbers.includes(num),
  ).length;

  return {
    card_number,
    winning_numbers,
    uncovered_numbers,
    matching_numbers,
  };
};

export const Puzzle1 = (lines: string[]) => {
  // Convert the lines of the record to a Game object.
  const cards: Card[] = lines.map(parse_game);

  // Find all the lines that have wins, and calculate the totals.
  const card_wins = cards.reduce(
    (score, card) =>
      card.matching_numbers == 0
        ? score
        : score + Math.pow(2, card.matching_numbers - 1),
    0,
  );

  return card_wins;
};

export const Puzzle2 = (lines: string[]) => {
  // Convert the lines of the record to a Game object.
  const cards: Card[] = lines.map(parse_game);

  const cards_won: { [card_index: number]: number } = Object.fromEntries(
    cards.map((card) => [card.card_number, 1]),
  );

  // Find all the lines that have wins, and calculate the totals.
  for (const card of cards) {
    if (card.matching_numbers == 0) continue;
    const copies = cards_won[card.card_number];

    for (const card_number of range(
      card.card_number + 1,
      card.card_number + card.matching_numbers,
    )) {
      if (card_number in cards_won) {
        cards_won[card_number] += copies;
      }
    }
  }

  // console.log(
  //   Object.fromEntries(
  //     Object.entries(cards_won).map(([card_number, count]) => [
  //       `Card ${card_number}`,
  //       count,
  //     ]),
  //   ),
  // );

  return Object.values(cards_won).reduce((sum, curr) => sum + curr, 0);
};
