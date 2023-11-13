CREATE INDEX idx_words_word ON words USING btree (word);

CREATE MATERIALIZED VIEW words_count AS SELECT COUNT(*) AS count FROM words
WITH DATA;
