#![allow(unused_variables)]

struct TranslationOffset {
    destination_start_index: usize,
    origin_start_index: usize,
    range_size: usize,
}

struct Translation {
    offsets: Vec<TranslationOffset>,
}

impl Translation {
    fn translate(input: usize) -> usize {
        todo!()
    }
}

struct Translator {
    seeds: Vec<usize>,
    translations: Vec<Translation>,
}

impl Translator {
    fn parse(data: &str) -> Self {
        todo!()
    }

    fn lookup(&self, seed: usize) -> usize {
        todo!()
    }
}

fn puzzle1(lines: &str) -> usize {
    todo!()
}

fn puzzle2(lines: &str) -> usize {
    todo!()
}

fn main() {
    let puzzle_input = include_str!("./puzzle-data.txt").trim();

    println!("Part 1 result: {}", puzzle1(&puzzle_input));
    println!("Part 2 result: {}", puzzle2(&puzzle_input));
}

#[cfg(test)]
mod tests {
    use super::*;

    static TEST_DATA: &str = "seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4";

    #[test]
    pub fn part_one() {
        let p1 = puzzle1(&TEST_DATA);
        assert_eq!(p1, 35);
    }

    #[test]
    pub fn part_two() {
        let p2 = puzzle2(&TEST_DATA);
        assert_eq!(p2, 46);
    }
}
