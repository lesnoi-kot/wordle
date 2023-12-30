import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import {
  CheckWordDTO,
  NewGameDTO,
  GameId,
  LettersMatches,
  MatchType,
  WORDS_COUNT,
  WORD_LENGTH,
} from "wordle-common";

import { GameEntity } from "../entities/game.entity.js";
import { WordEntity, WordsCountEntity } from "../entities/word.entity.js";

@Injectable()
export class WordleService {
  constructor(
    @InjectRepository(GameEntity) private gamesRepo: Repository<GameEntity>,
    @InjectRepository(WordEntity) private wordsRepo: Repository<WordEntity>,
    @InjectRepository(WordsCountEntity)
    private wordsCountRepo: Repository<WordsCountEntity>,
  ) {}

  async newGame(): Promise<NewGameDTO> {
    const { count } = await this.wordsCountRepo.findOneByOrFail({});

    const wordId = Math.floor(Math.random() * count);
    const game = await this.gamesRepo.save(this.gamesRepo.create({ wordId }));

    return { gameId: game.id };
  }

  async checkWord(gameId: GameId, guessWord: string): Promise<CheckWordDTO> {
    if (!(await this.doesWordExist(guessWord))) {
      return { isValid: false };
    }

    await this.gamesRepo.increment({ id: gameId }, "attempts", 1);
    const game = await this.gamesRepo.findOneBy({ id: gameId });

    if (!game) {
      return { isValid: false };
    }

    const { word: secretWord } = await game.word;

    if (secretWord.length !== guessWord.length) {
      return { isValid: false };
    }

    const matches = compareWords(guessWord, secretWord);

    if (game.attempts >= WORDS_COUNT || isWordFullyMatched(matches)) {
      return {
        isValid: true,
        matches,
        finished: true,
        word: secretWord,
        attempts: game.attempts,
      };
    }

    return { isValid: true, matches, finished: false };
  }

  // Finish a game and reveal secret word.
  async revealWord(gameId: GameId) {
    await this.gamesRepo.update({ id: gameId }, { attempts: WORDS_COUNT });
    const game = await this.gamesRepo.findOneByOrFail({ id: gameId });
    const { word } = await game.word;
    return { word };
  }

  private async doesWordExist(word: string): Promise<boolean> {
    return this.wordsRepo.exist({ where: { word } });
  }
}

function isWordFullyMatched(matches: LettersMatches): boolean {
  return matches.every((match) => match === MatchType.Exact);
}

function compareWords(guessWord: string, secretWord: string): LettersMatches {
  const matches = Array(WORD_LENGTH).fill(MatchType.None) as LettersMatches;

  for (let i = 0; i < secretWord.length; ++i) {
    if (secretWord[i] === guessWord[i]) {
      matches[i] = MatchType.Exact;
    } else if (secretWord.includes(guessWord[i])) {
      matches[i] = MatchType.Partial;
    }
  }

  return matches;
}
