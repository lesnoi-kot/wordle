import { api } from "../../services/api";
import { GameState } from "./useGameState";

import { Button } from "../Button/Button";
import { useAddToast } from "../Toasts/ToastsProvider";

export function Header({
  gameId,
  isFinished,
  onWordReveal,
}: Pick<GameState, "gameId" | "isFinished" | "onWordReveal">) {
  const addToast = useAddToast();

  return (
    <div className="flex items-center bg-zinc-800  px-4 py-2 text-white xs:p-4">
      <h1 className="bold text-2xl tracking-wider xs:text-4xl">вордли</h1>

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
