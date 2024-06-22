import {
  Controller,
  HttpCode,
  NotFoundException,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";

import {
  CheckWordDTO,
  NewGameDTO,
  RevealWordDTO,
  WORD_LENGTH,
} from "wordle-common";

import { WordleService } from "./wordle.service.js";

@Controller("/api/games")
export class WordleController {
  constructor(private readonly appService: WordleService) {}

  @Post("/new")
  async newGame(): Promise<NewGameDTO> {
    const gameId = await this.appService.newGame();
    return { gameId };
  }

  @HttpCode(200)
  @Post("/guess")
  async checkWord(
    @Query("gameId") gameId: number,
    @Query("word") word: string,
  ): Promise<CheckWordDTO> {
    if (word.length !== WORD_LENGTH) {
      return { isValid: false };
    }

    if (!(await this.appService.doesWordExist(word))) {
      return { isValid: false };
    }

    const checkResult = await this.appService.checkWord(gameId, word);

    if (!checkResult.isValid) {
      return { isValid: false };
    }

    if (checkResult.isFinished) {
      return {
        isValid: true,
        isFinished: true,
        matches: checkResult.matches,
        attempts: checkResult.attempts,
        word: checkResult.word,
      };
    }

    return {
      isValid: true,
      isFinished: false,
      matches: checkResult.matches,
      attempts: checkResult.attempts,
    };
  }

  @HttpCode(200)
  @Post("/reveal")
  async revealWord(
    @Query("gameId", ParseIntPipe) gameId: number,
  ): Promise<RevealWordDTO> {
    const word = await this.appService.revealWord(gameId);
    if (!word) {
      throw new NotFoundException();
    }
    return { word };
  }
}
