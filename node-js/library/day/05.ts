// import { PuzzleNotYetSolved, range } from "../helpers";

import { range } from "../helpers";

type TranslationOffset = {
  destination_start_index: number;
  origin_start_index: number;
  range_size: number;
};

type Range = {
  start: number;
  end: number;
};

class Translation {
  constructor(public readonly offsets: Array<TranslationOffset>) {}

  public translate(input: number): number {
    for (const {
      destination_start_index: dest,
      origin_start_index: src,
      range_size: range,
    } of this.offsets) {
      if (input >= src && input < src + range) {
        const offset = input - src;
        return dest + offset;
      }
    }

    return input;
  }
}

class Translator {
  private seed_numbers: number[] = [];
  private translations: Array<Translation> = [];

  constructor(data: string) {
    const [seed, ...chunks] = data.split("\n\n");

    this.seed_numbers =
      seed.split(":").pop()?.trim().split(" ").map(Number) ?? [];

    this.parse(chunks);
  }

  private parse(chunks: string[]): void {
    for (const chunk of chunks) {
      const parsed_lines = chunk
        .split("\n")
        .slice(1)
        .map((line) =>
          line
            .split(" ")
            .filter((v) => v.trim().length > 0)
            .map(Number),
        )
        .map((parts) => ({
          destination_start_index: parts[0],
          origin_start_index: parts[1],
          range_size: parts[2],
        })) as TranslationOffset[];

      this.translations.push(new Translation(parsed_lines));
    }
  }

  public lookup(seed: number) {
    return this.translations.reduce(
      (seed: number, translator: Translation) => translator.translate(seed),
      seed,
    );
  }

  public get ranges() {
    return this.translations[0].offsets;
  }

  public get seeds() {
    return this.seed_numbers;
  }
}

export const Puzzle1 = (data: string) => {
  const translator = new Translator(data);
  const translated = translator.seeds.map((seed) => translator.lookup(seed));

  const smallest_number = translated.reduce(
    (last_seen, position) => Math.min(last_seen, position),
    Number.POSITIVE_INFINITY,
  );

  return smallest_number;
};

export const Puzzle2 = async (data: string) => {
  const translator = new Translator(data);
  const seeds = Array.from(translator.seeds);

  const ranges = Array.from({ length: Math.ceil(seeds.length / 2) })
    .fill(null)
    .map(() => seeds.splice(0, 2));

  const range_offsets = ranges
    .map(([range_start, range_size]) => {
      const range_end = range_start + range_size - 1;

      const bounds = translator.ranges.find((rng) => {
        if (range_end < rng.origin_start_index) return false;
        if (range_start > rng.origin_start_index + rng.range_size - 1)
          return false;
        return true;
      });

      if (!bounds) return null;

      const translatable_seed_range = {
        start: Math.max(range_start, bounds.origin_start_index),
        end: Math.min(
          range_end,
          bounds.origin_start_index + bounds.range_size - 1,
        ),
      };

      let smallest = Number.POSITIVE_INFINITY;
      for (const num of range(
        translatable_seed_range.start,
        translatable_seed_range.end,
        true,
      )) {
        const translated = translator.lookup(num);
        if (translated >= smallest) continue;

        smallest = translated;
        console.log("New smallest value: %d", smallest);
      }

      return smallest;
    })
    .filter(<T>(v: T | null): v is T => v !== null);

  return range_offsets.sort((a, b) => a - b)[0];
};
