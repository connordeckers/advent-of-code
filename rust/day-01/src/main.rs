use std::{error::Error, num::ParseIntError};

use once_cell::sync::Lazy;
use regex::Regex;

fn get_digit_from_line(line: &str) -> Result<usize, ParseIntError> {
    [
        // Get the first character that matches a numeric value.
        line.matches(char::is_numeric).take(1).collect::<Vec<_>>()[0].to_string(),
        // Get the last character that matches a numeric value.
        line.rmatches(char::is_numeric).take(1).collect::<Vec<_>>()[0].to_string(),
    ]
    .join("")
    // Glue to the two together, and send it out.
    .parse::<usize>()
}

#[derive(Debug)]
struct NumberMatch {
    matched_string: String,
}

impl NumberMatch {
    pub fn parse(&self) -> Option<usize> {
        if let Ok(num) = &self.matched_string.parse::<usize>() {
            return Some(num.to_owned());
        }

        match self.matched_string.as_str() {
            "one" => Some(1),
            "two" => Some(2),
            "three" => Some(3),
            "four" => Some(4),
            "five" => Some(5),
            "six" => Some(6),
            "seven" => Some(7),
            "eight" => Some(8),
            "nine" => Some(9),
            _ => None,
        }
    }
}

impl<'a> From<&regex::Match<'a>> for NumberMatch {
    fn from(value: &regex::Match<'a>) -> Self {
        Self {
            matched_string: value.as_str().to_owned(),
        }
    }
}

fn get_number_from_line(line: &str) -> Result<usize, Box<dyn Error>> {
    // Use the lazy pattern, to prevent having to rebuild it every time.
    static PATTERN: Lazy<Regex> = Lazy::new(|| {
        Regex::new(r#"(?P<NUMBER>one|two|three|four|five|six|seven|eight|nine|\d)"#)
            .expect("The regex failed to compile.")
    });
    let matches: Vec<_> = PATTERN.find_iter(&line).collect();

    let num_first = matches
        .first()
        .and_then(|m| Some(NumberMatch::from(m)))
        .ok_or("No match found")?
        .parse()
        .ok_or("Could not parse number value.")?;

    let num_last = matches
        .last()
        .and_then(|m| Some(NumberMatch::from(m)))
        .ok_or("No match found")?
        .parse()
        .ok_or("Could not parse number value.")?;

    Ok(format!("{}{}", num_first, num_last).parse::<usize>()?)
}

fn main() {
    let puzzle_input = include_str!("./puzzle-data.txt")
        .trim()
        .split("\n");

    let part1: usize = puzzle_input
        .clone()
        .filter_map(|line| get_digit_from_line(line).ok())
        .sum();

    println!("Part 1 result: {}", part1);

    let part2: usize = puzzle_input
        .clone()
        .filter_map(|line| get_number_from_line(line).ok())
        .sum();

    println!("Part 2 result: {}", part2);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    pub fn part_one() {
        let test_data = "
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
            ";

        let lines = test_data.trim().split("\n");
        let total_sum: usize = lines
            .filter_map(|line| get_digit_from_line(line).ok())
            .sum();

        assert_eq!(total_sum, 142);
    }

    #[test]
    pub fn part_two() {
        let test_data = "
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
            ";

        let lines = test_data.trim().split("\n");
        let total_sum: usize = lines
            .filter_map(|line| get_number_from_line(line).ok())
            .sum();

        assert_eq!(total_sum, 281);
    }
}
