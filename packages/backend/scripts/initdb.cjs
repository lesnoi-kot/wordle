#!/usr/bin/env node

const fs = require("node:fs");
const sqlite = require("sqlite3").verbose();

const tablesSQL = `
CREATE TABLE words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  word TEXT NOT NULL
);

CREATE TABLE games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  word_id INTEGER REFERENCES words(id) ON DELETE CASCADE,
  is_finished INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER NOT NULL DEFAULT 0
);
`;

const postmigrationSQL = `
CREATE INDEX idx_words_word ON words (word);
CREATE TABLE words_count (count INTEGER);
INSERT INTO words_count (count) SELECT COUNT(*) FROM words;
`;

const words = fs
  .readFileSync("russian_nouns.txt")
  .toString("utf-8")
  .split("\n");

const db = new sqlite.Database("game.db");
db.serialize(() => {
  db.exec(tablesSQL);

  const stmt = db.prepare("INSERT INTO words (word) VALUES (?)");
  for (const word of words) {
    stmt.run(word);
  }
  stmt.finalize();

  db.exec(postmigrationSQL);
});
db.close();
