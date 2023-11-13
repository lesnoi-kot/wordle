import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WordleModule } from './wordle/wordle.module.js';
import { WordEntity, WordsCountEntity } from './entities/word.entity.js';
import { GameEntity } from './entities/game.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://wordle:wordle@localhost/wordle?application_name=wordle',
      entities: [WordEntity, GameEntity, WordsCountEntity],
    }),
    WordleModule,
  ],
})
export class AppModule {}
