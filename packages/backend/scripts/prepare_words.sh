# russian_nouns.txt is quite a big file to include to the repository.
cat russian_nouns.txt | node prepare_words.mjs | gzip --stdout > ./initdb/wordle.txt.gz
