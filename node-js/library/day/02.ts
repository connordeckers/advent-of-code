type CubeCollection = {
  red: number;
  green: number;
  blue: number;
};

type Game = {
  game_id: number;
  cubes_shown: CubeCollection[];
  max_seen: CubeCollection;
};

const parse_game = (line: string): Game => {
  const [game, moves_list] = line.split(":").map((block) => block.trim());

  const game_number = Number(game.split(" ")[1]);
  const max_seen: CubeCollection = { red: 0, blue: 0, green: 0 };
  const moves: CubeCollection[] = moves_list
    .split(";")
    .map((move) => move.trim())
    .map((move) => {
      const cubes = move.split(",").map((v) => v.trim());
      const collection = Object.fromEntries(
        cubes
          .map((p) => p.split(" ").reverse())
          .map(([key, count]) => [key, Number(count)]),
      );

      const counted: CubeCollection = {
        red: 0,
        blue: 0,
        green: 0,
        ...collection,
      };

      for (const [colour, count] of <Array<[keyof CubeCollection, number]>>(
        Object.entries(counted)
      )) {
        if (count > max_seen[colour]) max_seen[colour] = count;
      }

      return counted;
    });

  return { game_id: game_number, cubes_shown: moves, max_seen };
};

export const Puzzle1 = (lines: string[]) => {
  // Convert the lines of the record to a Game object.
  const games: Game[] = lines.map(parse_game);

  // Identify the maximum limit for each colour, so we
  // can tell which games would be impossible.
  const max_limit: CubeCollection = { red: 12, green: 13, blue: 14 };

  // Find all that games that are possible based on the above limit.
  const possible_games = games.filter(
    (game) =>
      game.max_seen.red <= max_limit.red &&
      game.max_seen.green <= max_limit.green &&
      game.max_seen.blue <= max_limit.blue,
  );

  // The sum of all the matching game IDs.
  const sum_of_ids = possible_games.reduce(
    (sum, curr) => sum + curr.game_id,
    0,
  );

  return sum_of_ids;
};

export const Puzzle2 = (lines: string[]) => {
  // Convert the lines of the record to a Game object.
  const games: Game[] = lines.map(parse_game);

  // Identify the power of the maximum cubes seen.
  const powers = games.map(
    ({ max_seen: { blue, green, red } }) => blue * red * green,
  );

  // Return the sum of these powers.
  return powers.reduce((sum, curr) => sum + curr, 0);
};
