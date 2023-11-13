// This script reads russian nouns from the stdin,
// and filters them by length=5 and usage frequency.

import fs from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const rl = createInterface({
  input: stdin,
  crlfDelay: Infinity,
  terminal: false,
});

const freqWords = new Set();

function readFreqWords() {
  const s = fs.readFileSync('popular_words.txt', 'utf-8');

  for (let word of s.split('\n')) {
    if (word.length === 5) {
      freqWords.add(word);
    }
  }
}

readFreqWords();

for await (const line of rl) {
  // It's possible for the value returned by length to not match
  // the actual number of Unicode characters in the string.
  // But for common scripts like Latin and Cyrillic this should not be an issue.
  if (line.length === 5 && freqWords.has(line)) {
    stdout.write(line);
    stdout.write('\n');
  }
}

rl.close();
