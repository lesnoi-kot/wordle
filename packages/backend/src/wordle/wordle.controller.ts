import { Controller, Get, Post, Query } from '@nestjs/common';

import { NewGameDTO, RevealWordDTO } from 'wordle-common';

import { WordleService } from './wordle.service.js';

@Controller('/words')
export class WordleController {
  constructor(private readonly appService: WordleService) {}

  @Get('/random')
  async getRandomWordHandle(): Promise<NewGameDTO> {
    const { gameId } = await this.appService.newGame();
    return { gameId };
  }

  @Get('/check')
  async checkWord(
    @Query('gameId') gameId: string,
    @Query('word') word: string,
  ) {
    return this.appService.checkWord(Number(gameId), word);
  }

  @Post('/reveal')
  async revealWord(@Query('gameId') gameId: string): Promise<RevealWordDTO> {
    const { word } = await this.appService.revealWord(Number(gameId));
    return { word };
  }
}
