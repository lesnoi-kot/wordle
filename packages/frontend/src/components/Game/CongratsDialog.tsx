import clsx from "clsx";
import { ComponentPropsWithRef, ForwardedRef, forwardRef } from "react";
import { WORDS_COUNT } from "wordle-common";

import { Dialog } from "../Dialog/Dialog";
import { Button } from "../Button/Button";

type Props = ComponentPropsWithRef<typeof Dialog> & {
  attempts: number;
  correctWord: string;
  isVictory: boolean;
  isResigned?: boolean;
  startNewGame(): void;
};

export const CongratsDialog = forwardRef(
  (
    { attempts, isVictory, correctWord, startNewGame }: Props,
    ref: ForwardedRef<HTMLDialogElement>,
  ) => {
    return (
      <Dialog ref={ref} className="w-3/4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <Star gold={isVictory && attempts <= WORDS_COUNT} />
            <Star gold={isVictory && attempts <= 5} />
            <Star gold={isVictory && attempts <= 3} />
          </div>
          <h3 className="bold text-xl sm:text-2xl">
            {isVictory ? getCongratsText(attempts) : "Попробуй еще раз"}
          </h3>
          <p className="sm:text-lg">
            Правильное слово было <b>"{correctWord}"</b>.
          </p>

          <Button
            className="mt-8 self-end"
            onClick={() => {
              startNewGame();
            }}
            primary
          >
            Новая игра
          </Button>
        </div>
      </Dialog>
    );
  },
);

function getCongratsText(attempts: number) {
  if (attempts === 1) {
    return "Невероятная удача!";
  }

  if (attempts <= 3) {
    return "Супер!";
  }

  return "Хороший результат!";
}

function Star({ gold }: { gold: boolean }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 50 50"
      width="30px"
      height="30px"
      className={gold ? "animate-jump animate-delay-500 animate-once" : ""}
    >
      <path
        className={clsx(gold ? "fill-[gold]" : "fill-[lightgray]")}
        d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
    c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
    c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
    c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
    c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
    C22.602,0.567,25.338,0.567,26.285,2.486z"
      />
    </svg>
  );
}
