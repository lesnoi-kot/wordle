import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { times } from 'lodash';
import {
  LettersMatches,
  MatchType,
  WORDS_COUNT,
  WORD_LENGTH,
} from 'wordle-common';

import { Word } from '../Word/Word';

export const useKeyboardInputEffect = (
  onLetterInput: (letter: string) => void,
) => {
  useEffect(() => {
    function onKeyUp(event: KeyboardEvent) {
      // console.log(event);

      if (
        event.target &&
        'tagName' in event.target &&
        event.target.tagName === 'BUTTON'
      ) {
        event.preventDefault();
      }

      if (event.key === 'Enter') {
        onLetterInput('\n');
        return;
      }

      if (event.key === 'Backspace') {
        onLetterInput('\b');
        return;
      }

      const key = event.key.toLowerCase();

      if (key >= 'а' && key <= 'я') {
        onLetterInput(key);
      }
    }

    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onLetterInput]);
};

type WordProp = ComponentPropsWithoutRef<typeof Word>['word'];

const DEFAULT_WORDS_STATE = times(WORDS_COUNT, () => '');

const zipWord = (word: string, letters: LettersMatches): WordProp => {
  return times(WORD_LENGTH, (i) => ({
    letter: word[i] ?? '',
    match: letters[word[i]],
  }));
};

export const useWordsState = () => {
  const [row, setRow] = useState(0);
  const [words, setWords] = useState(DEFAULT_WORDS_STATE);
  const [letters, setLetters] = useState<LettersMatches>({});

  const setCurrentWord = useCallback(
    (word: string) => {
      setWords((words) => words.with(row, word.substring(0, WORD_LENGTH)));
    },
    [row],
  );

  const onWordAccepted = useCallback((matches: LettersMatches) => {
    setLetters((letters) => ({ ...letters, ...matches }));
    setRow((row) => row + 1);
  }, []);

  const resetState = useCallback(() => {
    setRow(0);
    setWords(DEFAULT_WORDS_STATE);
    setLetters({});
  }, []);

  const wordProps = useMemo(
    (): WordProp[] =>
      words
        .map((word) => zipWord(word, letters))
        .with(row, zipWord(words[row], {})),
    [row, words, letters],
  );

  return {
    row,
    words: wordProps,
    letters,
    setCurrentWord,
    resetState,
    onWordAccepted,
    currentWord: words[row],
    rowIsFilled: words[row].length === WORD_LENGTH,
    isFinished: row === WORDS_COUNT,
  };
};
