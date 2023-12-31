import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import {
  GameId,
  CheckWordDTO,
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

  async newGame(): Promise<GameId> {
    const { count } = await this.wordsCountRepo.findOneByOrFail({});
    const wordId = Math.floor(Math.random() * count);
    const game = await this.gamesRepo.save(this.gamesRepo.create({ wordId }));
    return game.id;
  }

  async checkWord(gameId: GameId, guessWord: string): Promise<CheckWordDTO> {
    await this.gamesRepo.increment(
      { id: gameId, isFinished: false },
      "attempts",
      1,
    );
    const game = await this.gamesRepo.findOneBy({ id: gameId });
    if (!game) {
      return { isValid: false };
    }

    const { word: secretWord } = await game.word;
    const matches = compareWords(guessWord, secretWord);
    const isSolved = isWordFullyMatched(matches);

    if (!game.isFinished && (isSolved || game.attempts >= WORDS_COUNT)) {
      game.isFinished = true;
      await this.gamesRepo.update({ id: game.id }, { isFinished: true });
    }

    return {
      isValid: true,
      matches,
      isFinished: game.isFinished,
      word: secretWord,
      attempts: game.attempts,
    };
  }

  // Finish a game and reveal secret word.
  async revealWord(gameId: GameId): Promise<string | null> {
    const game = await this.gamesRepo.findOneBy({ id: gameId });
    if (!game) {
      return null;
    }

    game.isFinished = true;
    await this.gamesRepo.update(
      { id: game.id, isFinished: false },
      { isFinished: true, attempts: WORDS_COUNT },
    );
    return (await game.word).word;
  }

  async doesWordExist(word: string): Promise<boolean> {
    return this.wordsRepo.exist({ where: { word } });
  }
}

function isWordFullyMatched(matches: LettersMatches): boolean {
  return matches.every((match) => match === MatchType.Exact);
}

function compareWords(guessWord: string, secretWord: string): LettersMatches {
  const matches = Array(WORD_LENGTH).fill(MatchType.None) as LettersMatches;

  if (secretWord.length !== guessWord.length) {
    return matches;
  }

  for (let i = 0; i < secretWord.length; ++i) {
    if (secretWord[i] === guessWord[i]) {
      matches[i] = MatchType.Exact;
    } else if (secretWord.includes(guessWord[i])) {
      matches[i] = MatchType.Partial;
    }
  }

  return matches;
}
