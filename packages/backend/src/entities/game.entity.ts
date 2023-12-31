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

  @Column({ name: "is_finished", default: false })
  isFinished: boolean;

  @OneToOne((type) => WordEntity)
  @JoinColumn({ name: "word_id" })
  word: Promise<WordEntity>;
}
