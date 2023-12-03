import { ForwardedRef, forwardRef } from "react";
import { MatchType } from "wordle-common";

import { Dialog } from "../Dialog/Dialog";
import { Word } from "../Word/Word";

type Props = {
  onClose: () => void;
};

export const Rules = forwardRef(
  ({ onClose }: Props, ref: ForwardedRef<HTMLDialogElement>) => {
    return (
      <Dialog
        ref={ref}
        canClose
        onClose={onClose}
        className="top-0 min-h-full w-full max-w-none border-0 p-6 sm:min-h-fit sm:max-w-lg sm:border sm:p-8"
      >
        <article className="space-y-4">
          <header className="space-y-2">
            <h2 className="text-3xl">Правила игры</h2>
            <h3 className="text-lg">Угадай слово за 6 попыток</h3>
          </header>

          <ul className="ml-4 list-disc space-y-1">
            <li>
              Каждая попытка должна быть валидным 5-буквенным существительным.
            </li>
            <li>Цвет клетки обозначает насколько точна догадка.</li>
          </ul>

          <h3 className="text-xl font-bold">Примеры</h3>

          <section className="space-y-4">
            <div>
              <Word
                className="origin-left scale-75"
                word="банан"
                matches={[MatchType.Exact, null, null, null, null]}
              />
              Буква <b>Б</b> находится в правильном месте загаданного слова.
            </div>

            <div>
              <Word
                className="origin-left scale-75"
                word="берег"
                matches={[
                  null,
                  MatchType.Partial,
                  null,
                  MatchType.Partial,
                  null,
                ]}
              />
              Буква <b>Е</b> присутствует в слове, но находится на другой
              позиции.
            </div>

            <div>
              <Word
                className="origin-left scale-75"
                word="шутка"
                matches={[null, null, MatchType.None, null, null]}
              />
              Буква <b>Т</b> не присутствует в загаданном слове.
            </div>
          </section>
        </article>
      </Dialog>
    );
  },
);
