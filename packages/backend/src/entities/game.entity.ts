import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { WordEntity } from "./word.entity.js";

@Entity("games")
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "word_id" })
  wordId: number;

  @Column({ default: 0 })
  attempts: number;

  @OneToOne((type) => WordEntity)
  @JoinColumn({ name: "word_id" })
  word: Promise<WordEntity>;
}
