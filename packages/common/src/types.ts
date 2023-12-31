import { MatchType } from "./enums";

export type GameId = number;

export type LettersMap = Record<string, MatchType>;
export type LettersMatches = [
  MatchType,
  MatchType,
  MatchType,
  MatchType,
  MatchType,
];

export type CheckWordDTO =
  // Guess is invalid and not counts as an attempt.
  | { isValid: false }
  // Attempt is valid. When game finishes, secret word will be revealed.
  | ({ isValid: true; matches: LettersMatches; attempts: number } & (
      | { isFinished: true; word: string }
      | { isFinished: false }
    ));

export type NewGameDTO = {
  gameId: GameId;
};

export type RevealWordDTO = {
  word: string;
};
