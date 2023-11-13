import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ViewEntity,
  ViewColumn,
} from 'typeorm';

@Entity('words')
export class WordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  word: string;
}

@ViewEntity('words_count', { materialized: true })
export class WordsCountEntity {
  @ViewColumn()
  count: number;
}
