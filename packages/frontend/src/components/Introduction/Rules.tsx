import { MatchType } from 'wordle-common';

import { Dialog } from '../Dialog';
import { Word } from '../Word/Word';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function Rules({ open, onClose }: Props) {
  if (!open) {
    return null;
  }

  return (
    <Dialog
      canClose
      onClose={onClose}
      open={open}
      className="w-full sm:p-8 md:max-w-lg animate-fade-up"
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
          <li>
            Цвета квадратиков обозначают есть ли буква в загаданном слове.
          </li>
        </ul>

        <h3 className="text-xl font-bold">Примеры</h3>

        <section className="space-y-4">
          <div>
            <Word
              className="scale-75 origin-left"
              word="банан"
              matches={[
                MatchType.Exact,
                undefined, //MatchType.None,
                undefined, //MatchType.None,
                undefined, //MatchType.None,
                undefined, //MatchType.None,
              ]}
            />
            Буква <b>Б</b> находится в правильном месте загаданного слова.
          </div>

          <div>
            <Word
              className="scale-75 origin-left"
              word="берег"
              matches={[
                undefined,
                MatchType.Partial,
                undefined,
                MatchType.Partial,
                undefined,
              ]}
            />
            Буква <b>Е</b> присутствует в слове, но находится на другой позиции.
          </div>

          <div>
            <Word
              className="scale-75 origin-left"
              word="шутка"
              matches={[
                undefined,
                undefined,
                MatchType.None,
                undefined,
                undefined,
              ]}
            />
            Буква <b>Т</b> не присутствует в загаданном слове.
          </div>
        </section>
      </article>
    </Dialog>
  );
}
