import path from "node:path";
import { fileURLToPath } from "node:url";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from "@nestjs/serve-static";

import { WordleModule } from "./wordle/wordle.module.js";
import { WordEntity, WordsCountEntity } from "./entities/word.entity.js";
import { GameEntity } from "./entities/game.entity.js";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "game.db",
      ),
      entities: [WordEntity, GameEntity, WordsCountEntity],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "client",
      ),
      exclude: ["/api/(.*)"],
    }),
    WordleModule,
  ],
})
export class AppModule {}
