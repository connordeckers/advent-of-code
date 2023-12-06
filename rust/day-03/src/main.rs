#![allow(dead_code)]

fn puzzle1(lines: &Vec<&str>) -> usize {
    0
}

fn puzzle2(lines: &Vec<&str>) -> usize {
    0
}

fn main() {
    let puzzle_input: Vec<_> = include_str!("./puzzle-data.txt")
        .trim()
        .split("\n")
        .collect();

    println!("Part 1 result: {}", puzzle1(&puzzle_input));
    println!("Part 2 result: {}", puzzle2(&puzzle_input));
}

#[cfg(test)]
mod tests {
    use super::*;

    static TEST_DATA: [&str; 0] = [];

    #[test]
    pub fn part_one() {
        let p1 = puzzle1(&TEST_DATA.to_vec());
        assert_eq!(p1, 1);
    }

    #[test]
    pub fn part_two() {
        let p2 = puzzle2(&TEST_DATA.to_vec());
        assert_eq!(p2, 1);
    }
}
