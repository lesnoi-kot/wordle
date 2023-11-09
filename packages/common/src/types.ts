import { MatchType } from './enums';

export type GetRandomWordHandleResult = {
  wordHandle: number;
};

export type LettersMatches = Record<string, MatchType>;

export type CheckWordResult =
  | {
      isValid: true;
      matches: LettersMatches;
    }
  | { isValid: false };
