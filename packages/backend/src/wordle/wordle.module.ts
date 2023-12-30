import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { WordEntity, WordsCountEntity } from "../entities/word.entity.js";
import { GameEntity } from "../entities/game.entity.js";

import { WordleController } from "./wordle.controller.js";
import { WordleService } from "./wordle.service.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([WordEntity, GameEntity, WordsCountEntity]),
  ],
  controllers: [WordleController],
  providers: [WordleService],
})
export class WordleModule {}
