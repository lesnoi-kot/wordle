# russian_nouns.txt is quite a big file to include to the repository.
cat russian_nouns.txt | gzip --stdout > ./initdb/wordle.txt.gz
