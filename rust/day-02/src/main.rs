#![allow(dead_code)]

#[derive(Debug)]
struct CubeCount {
    red: usize,
    green: usize,
    blue: usize,
}

#[derive(Debug)]
struct Game {
    id: usize,
    cubes_shown: Vec<CubeCount>,
}

impl Game {
    fn parse_from_string(line: &str) -> Self {
        let (game_id, moves) = line.split_once(':').unwrap();
        let game_id = game_id
            .rmatches(char::is_numeric)
            .take(1)
            .collect::<Vec<_>>()[0]
            .parse::<usize>()
            .unwrap();

        let cubes_shown: Vec<CubeCount> = moves
            .split(';')
            .map(|chunk| {
                let mut cubes = CubeCount {
                    red: 0,
                    green: 0,
                    blue: 0,
                };

                for cube_count in chunk.split(',') {
                    let (count, cube) = cube_count.trim().split_once(' ').unwrap();
                    let count = count.parse::<usize>().unwrap();
                    match cube {
                        "red" => cubes.red = count,
                        "green" => cubes.green = count,
                        "blue" => cubes.blue = count,
                        _ => (),
                    }
                }

                cubes
            })
            .collect();

        Self {
            id: game_id,
            cubes_shown,
        }
    }

    pub fn max(&self) -> CubeCount {
        let mut collection = CubeCount {
            blue: 0,
            green: 0,
            red: 0,
        };

        for hand in &self.cubes_shown {
            collection.red = collection.red.max(hand.red);
            collection.green = collection.green.max(hand.green);
            collection.blue = collection.blue.max(hand.blue);
        }

        collection
    }
}

fn puzzle1(lines: &Vec<&str>) -> usize {
    let games = lines
        .into_iter()
        .map(|line| Game::parse_from_string(line))
        .collect::<Vec<_>>();

    println!("{} games were parsed.", games.len());

    let max_limit = CubeCount {
        red: 12,
        green: 13,
        blue: 14,
    };

    let games_below_limit: Vec<_> = games.into_iter().filter(|game| {
        let cubes = game.max();
        cubes.red <= max_limit.red && cubes.green <= max_limit.green && cubes.blue <= max_limit.blue
    }).collect();

    // println!("{:#?}", games_below_limit.iter().map(|game| game.id));
    // println!("{:#?}", games_below_limit.iter().map(|game| game.id));

    todo!("Figure out why this isn't summing up correctly on the puzzle input.");

    0
    // .into_iter().sum()
}

fn puzzle2(lines: &Vec<&str>) -> usize {
    let games = lines
        .into_iter()
        .map(|line| Game::parse_from_string(line))
        .collect::<Vec<_>>();

    let max_powers = games.into_iter().map(|game| {
        let max = game.max();
        max.blue * max.green * max.red
    });

    max_powers.sum()
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

    static TEST_DATA: [&str; 5] = [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
    ];

    #[test]
    pub fn part_one() {
        let p1 = puzzle1(&TEST_DATA.to_vec());
        assert_eq!(p1, 8);
    }

    #[test]
    pub fn part_two() {
        let p2 = puzzle2(&TEST_DATA.to_vec());
        assert_eq!(p2, 2286);
    }
}
