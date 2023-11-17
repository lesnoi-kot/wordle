import { api } from '../../services/api';
import { GameState } from './useGameState';

import { Button } from '../Button/Button';
import { useAddToast } from '../Toasts/ToastsProvider';

export function Header({
  gameId,
  isFinished,
  onWordReveal,
}: Pick<GameState, 'gameId' | 'isFinished' | 'onWordReveal'>) {
  const addToast = useAddToast();

  return (
    <div className="flex flex-row gap-4 p-4 items-center bg-zinc-800 text-white">
      <h1 className="text-2xl md:text-4xl bold tracking-wider">вордли</h1>

      <Button
        className="ml-auto"
        primary
        disabled={isFinished}
        onClick={() => {
          api
            .revealWord({ gameId })
            .then(({ word }) => {
              onWordReveal(word);
            })
            .catch((error) => {
              addToast({ text: `Ошибка сети (${String(error)})` });
            });
        }}
      >
        Сдаюсь
      </Button>
    </div>
  );
}
