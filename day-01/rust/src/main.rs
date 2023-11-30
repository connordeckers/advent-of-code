use std::fs;

fn main() {
    let puzzle_input =
        fs::read_to_string("./res/puzzle-input.txt").expect("Cannot read puzzle data.");

    let mut elves_storage = puzzle_input
        .split("\n\n")
        .map(|chunk| {
            chunk
                .split('\n')
                .filter_map(|num| num.parse::<usize>().ok())
                .sum::<usize>()
        })
        .collect::<Vec<_>>();

    // Sort the elves by their storage.
    elves_storage.sort_unstable();

    // Reverse the collection so that the highest values are first.
    elves_storage.reverse();

    println!(
        "Elf with the most food is holding {:#?} calories.",
        &elves_storage.first().unwrap_or(&0)
    );

    println!(
        "The top three elves are holding {:#?} calories.",
        Vec::from(&elves_storage[0..3]).iter().sum::<usize>()
    );
}
