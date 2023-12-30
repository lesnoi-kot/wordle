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
  | { isValid: false }
  | ({ isValid: true; matches: LettersMatches } & (
      | { finished: true; word: string; attempts: number }
      | { finished: false }
    ));

export type NewGameDTO = {
  gameId: GameId;
};

export type RevealWordDTO = {
  word: string;
};
