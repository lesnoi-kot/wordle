gunzip --stdout /docker-entrypoint-initdb.d/wordle.txt.gz \
  | psql -c "COPY words (word) FROM STDIN;" -d wordle -U wordle
