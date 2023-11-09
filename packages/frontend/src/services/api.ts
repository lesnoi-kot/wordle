import { CheckWordResult, MatchType } from 'wordle-common';

type APIOptions = {
  baseUrl: string;
};

type CheckWordOptions = {
  wordHandle: number;
  guessWord: string;
};

class API {
  baseUrl: string;

  constructor({ baseUrl }: APIOptions) {
    this.baseUrl = baseUrl;
  }

  async getRandomWordHandle(): Promise<number> {
    return 0;
  }

  async checkWord(options: CheckWordOptions): Promise<CheckWordResult> {
    if (options.guessWord === 'уголь') {
      return {
        isValid: true,
        matches: {
          у: MatchType.None,
          г: MatchType.Partial,
          о: MatchType.None,
          л: MatchType.Exact,
          ь: MatchType.Exact,
        },
      };
    }

    if (options.guessWord === 'обувь') {
      return {
        isValid: true,
        matches: {
          о: MatchType.None,
          б: MatchType.Partial,
          у: MatchType.None,
          в: MatchType.Partial,
          ь: MatchType.None,
        },
      };
    }

    if (options.guessWord === 'берег') {
      return {
        isValid: true,
        matches: {
          б: MatchType.Partial,
          е: MatchType.None,
          р: MatchType.None,
          г: MatchType.Partial,
        },
      };
    }

    return { isValid: false };
  }
}

export const api = new API({ baseUrl: '' });
