import { readFileSync } from "node:fs";
export const GetPuzzleData = (): string =>
  readFileSync(`${__dirname}/puzzle-input.txt`, "utf8").trim();

const digits = [
  ,
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const words = digits.filter(Boolean).join("|");
const first_digit = /^.*?(\d)/;
const last_digit = /.*(\d).*?$/;

const first_number = new RegExp(`^.*?(\\d|${words})`, "i");
const last_number = new RegExp(`.*(\\d|${words}).*?$`, "i");

export const GetDigitsOfLine = (
  line: string,
  numeric_only: boolean,
): number => {
  const regex_first = new RegExp(numeric_only ? first_digit : first_number);
  const regex_last = new RegExp(numeric_only ? last_digit : last_number);

  let first_number_in_string = regex_first.exec(line)?.[1] ?? "0";
  let last_number_in_string = regex_last.exec(line)?.[1] ?? "0";

  if (!numeric_only) {
    if (Number.isNaN(parseInt(first_number_in_string)))
      first_number_in_string = String(digits.indexOf(first_number_in_string));

    if (Number.isNaN(parseInt(last_number_in_string)))
      last_number_in_string = String(digits.indexOf(last_number_in_string));
  }

  return Number(`${first_number_in_string}${last_number_in_string}`);
};

export const GetTotalSum = (numbers: number[]): number =>
  numbers.reduce((sum, curr) => curr + sum, 0);
