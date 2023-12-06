// #![allow(unused_variables)]

struct Race {
    time: usize,
    record_distance: usize,
}

impl Race {
    fn calculate_times(&self) -> Vec<usize> {
        (1..=self.time).map(|ms| (self.time - ms) * ms).collect()
    }

    fn beats_record(&self) -> Vec<usize> {
        self.calculate_times()
            .into_iter()
            .filter(|distance| distance > &self.record_distance)
            .collect()
    }
}

fn puzzle1(time: &[usize], distance: &[usize]) -> usize {
    let collection: Vec<_> = time
        .iter()
        .zip(distance)
        .map(|(time, distance)| Race {
            time: *time,
            record_distance: *distance,
        })
        .collect();

    let better_moves: usize = collection
        .into_iter()
        .map(|race| race.beats_record().len())
        .product();

    better_moves
}

fn puzzle2(time: &[usize], distance: &[usize]) -> usize {
    let race = Race {
        time: time
            .iter()
            .map(ToString::to_string)
            .collect::<Vec<String>>()
            .join("")
            .parse()
            .unwrap_or(0),

        record_distance: distance
            .iter()
            .map(ToString::to_string)
            .collect::<Vec<String>>()
            .join("")
            .parse()
            .unwrap_or(0),
    };

    race.beats_record().len()
}

fn main() {
    let time: [usize; 4] = [46, 85, 75, 82];
    let distance: [usize; 4] = [208, 1412, 1257, 1410];

    println!("Part 1 result: {}", puzzle1(&time, &distance));
    println!("Part 2 result: {}", puzzle2(&time, &distance));
}

#[cfg(test)]
mod tests {
    use super::*;

    static TIME: [usize; 3] = [7, 15, 30];
    static DISTANCE: [usize; 3] = [9, 40, 200];

    #[test]
    pub fn part_one() {
        let p1 = puzzle1(&TIME, &DISTANCE);
        assert_eq!(p1, 288);
    }

    #[test]
    pub fn part_two() {
        let p2 = puzzle2(&TIME, &DISTANCE);
        assert_eq!(p2, 71503);
    }
}
