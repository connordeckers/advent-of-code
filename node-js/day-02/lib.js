/**
 * Move enum
 * @readonly
 * @enum {number}
 */
const MOVE = { ROCK: 1, PAPER: 2, SCISSORS: 3 };

/** The move that's beaten by each hand. */
const BEATEN_BY = {
  [MOVE.ROCK]: MOVE.PAPER,
  [MOVE.PAPER]: MOVE.SCISSORS,
  [MOVE.SCISSORS]: MOVE.ROCK,
};

/** The base score for each match, before the modifiers are applied. */
const BASE_SCORE = 3;

/**
 * The match outcome.
 * @readonly
 * @enum {number}
 */
const MATCH_OUTCOME = {
  LOSE: 0,
  DRAW: 1,
  WIN: 2,
};

/**
 * Move name, based on the move key.
 * @readonly
 */
const MOVE_NAME = {
  [MOVE.ROCK]: "rock",
  [MOVE.PAPER]: "paper",
  [MOVE.SCISSORS]: "scissors",
};

const OUTCOME_NAME = {
  [MATCH_OUTCOME.LOSE]: "lose",
  [MATCH_OUTCOME.DRAW]: "draw",
  [MATCH_OUTCOME.WIN]: "win",
};

const MOVE_ID = {
  A: MOVE.ROCK,
  X: MOVE.ROCK,

  B: MOVE.PAPER,
  Y: MOVE.PAPER,

  C: MOVE.SCISSORS,
  Z: MOVE.SCISSORS,
};

/**
 * The outcome of a match.
 * @readonly
 * @enum {number}
 */
const OUTCOME_ID = {
  X: MATCH_OUTCOME.LOSE,
  Y: MATCH_OUTCOME.DRAW,
  Z: MATCH_OUTCOME.WIN,
};

/**
 * Figure out the outcome of two competing hands.
 * @param {MOVE} their_move The move they've made.
 * @param {MOVE} our_move The move we've made.
 * @returns {MATCH_OUTCOME} The outcome of the match.
 */
const determine_match_outcome = (their_move, our_move) => {
  // The moves are the same.
  if (their_move === our_move) return MATCH_OUTCOME.DRAW;

  // Get the move that would beat their play, and see if that's what we did.
  return BEATEN_BY[their_move] === our_move
    ? MATCH_OUTCOME.WIN
    : MATCH_OUTCOME.LOSE;
};

/**
 * Figure out which hand would need to be played to achieve a specific outcome.
 * @param {MOVE} their_move The move they've made.
 * @param {OUTCOME_ID} The outcome of the match.
 * @returns {MOVE} our_move The move we need to make.
 */
const determine_move_by_outcome = (their_move, outcome) => {
  switch (outcome) {
    case MATCH_OUTCOME.DRAW:
      return their_move;

    case MATCH_OUTCOME.WIN:
      return BEATEN_BY[their_move];

    case MATCH_OUTCOME.LOSE:
      return BEATEN_BY[BEATEN_BY[their_move]];
  }
};

/**
 * Play the game!
 * @param {string[]} strategy - The plays made.
 * @param {boolean} play_by_play - Show the outcome of each turn.
 * @returns number Our overall score at the end of the game.
 */
export const play_game = (strategy, play_by_play = true) => {
  let total_score = 0;

  const play_msg = (...args) => {
    if (play_by_play) console.log(...args);
  };

  for (const move of strategy) {
    const [PLAY_THEM, PLAY_US] = move.split(" ").map((id) => MOVE_ID[id]);

    // Figure out who won.
    const modifier = determine_match_outcome(PLAY_THEM, PLAY_US);

    play_msg(
      "They played %s; you played %s. %s",
      MOVE_NAME[PLAY_THEM],
      MOVE_NAME[PLAY_US],
      [
        "You lose this turn. :(",
        "It's a draw this time.",
        "You win this turn!",
      ].at(modifier),
    );

    // The score increase based on the hand we played,
    // plus the increase based on whether we win or not.
    let points_earned = PLAY_US + BASE_SCORE * modifier;
    total_score += points_earned;

    play_msg(
      "You gain %d points (%d for your hand, and %d for %s),\nbringing your total score to %d.",
      points_earned,
      PLAY_US,
      BASE_SCORE * modifier,
      ["losing", "drawing", "winning"].at(modifier),
      total_score,
    );
    play_msg();
  }

  play_msg();
  console.log(
    "Total score at the end of %d rounds: %d",
    strategy.length,
    total_score,
  );
};

/**
 * Rematch!
 * @param {string[]} strategy - The plays made.
 * @param {boolean} play_by_play - Show the outcome of each turn.
 * @returns number Our overall score at the end of the game.
 */
export const play_game_again = (strategy, play_by_play = true) => {
  let total_score = 0;

  const play_msg = (...args) => {
    if (play_by_play) console.log(...args);
  };

  for (const move of strategy) {
    const moves = move.split(" ");
    const PLAY_THEM = MOVE_ID[moves[0]];
    const DESIRED_OUTCOME = OUTCOME_ID[moves[1]];

    // Figure out who won.
    const hand_to_play = determine_move_by_outcome(PLAY_THEM, DESIRED_OUTCOME);

    play_msg(
      "They played %s; to %s the game, you need to play %s.",
      MOVE_NAME[PLAY_THEM],
      OUTCOME_NAME[DESIRED_OUTCOME],
      MOVE_NAME[hand_to_play],
    );

    // The score increase based on the hand we played,
    // plus the increase based on whether we win or not.
    let points_earned = hand_to_play + BASE_SCORE * DESIRED_OUTCOME;
    total_score += points_earned;

    play_msg(
      "You gain %d points (%d for your hand, and %d for %s),\nbringing your total score to %d.",
      points_earned,
      hand_to_play,
      BASE_SCORE * DESIRED_OUTCOME,
      ["losing", "drawing", "winning"].at(DESIRED_OUTCOME),
      total_score,
    );
    play_msg();
  }

  play_msg();
  console.log(
    "Total score at the end of %d rounds: %d",
    strategy.length,
    total_score,
  );
};
