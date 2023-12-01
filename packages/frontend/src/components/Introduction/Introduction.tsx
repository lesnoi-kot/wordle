import { Button } from '../Button/Button';
import { Rules } from './Rules';
import { useDialogController } from '../Dialog/hooks';

import iconSVG from '../../assets/wordle-icon.svg';

type Props = {
  onStart(): void;
};

export function Introduction({ onStart }: Props) {
  const { ref: dialogRef, showModal, close } = useDialogController();

  return (
    <div className="min-h-screen flex place-items-center place-content-center">
      <div className="flex flex-col gap-4 items-center">
        <img src={iconSVG} alt="Logo" className="h-[62px] animate-jump-in" />
        <h1 className="text-4xl bold tracking-wider">вордли</h1>
        <p className=" text-lg">Угадай слово из 5 букв за 6 раз</p>

        <div className="flex flex-row gap-2 xs:gap-4">
          <Button
            onClick={() => {
              showModal();
            }}
          >
            Правила игры
          </Button>
          <Button primary onClick={onStart}>
            Играть
          </Button>
        </div>
      </div>

      <Rules
        ref={dialogRef}
        onClose={() => {
          close();
        }}
      />
    </div>
  );
}
