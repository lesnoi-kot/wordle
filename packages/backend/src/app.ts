import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WordleModule } from "./wordle/wordle.module.js";
import { WordEntity, WordsCountEntity } from "./entities/word.entity.js";
import { GameEntity } from "./entities/game.entity.js";
import { DATABASE_DSN } from "./settings.js";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: DATABASE_DSN,
      entities: [WordEntity, GameEntity, WordsCountEntity],
    }),
    WordleModule,
  ],
})
export class AppModule {}
