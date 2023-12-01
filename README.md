# Advent of Code

Advent of Code 2023 is now underway, and I'm taking part for the first time.
I'm going to do this in two different languages, Rust and Typescript.

## Typescript

To ensure I've understood the puzzles, I'm solving them in Typescript, with Jest
tests to verify that the solutions match the examples provided. This is great practice
for me to get better at writing tests, and working with test-driven design, as I'm
writing the test first (and the expected output), and then working my way back towards
the solution. Only once the test passes to I run it against the final dataset!

These solutions can be found in the `./node-js/` directory; if you want to try out
a solution, make sure you run `yarn install` first. There's also a [README.md](./node-js/README.md)
file there as well, which can be run with the amazing [Mask](https://github.com/jacobdeichert/mask).

## Rust

In order to get more practice in, including understanding things like nuances,
lifetimes, etc, I'm rewriting each solution in Rust once I've finished it in
Typescript. This lets me relax, knowing I've found the solution, and then use the
energy to understand how Rust would handle an approach differently to Typescript.

If you want to see how I've approached the problems using Rust, you can find the
terrible attempts in `./rust/`; each day is being built as a self-contained binary
within the `./rust/src/bin/` directory, with the daily puzzle inputs (for my account,
at least) being stored within `./rust/src/puzzle-inputs/`.
