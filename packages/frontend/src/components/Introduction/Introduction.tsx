import { Button } from "../Button/Button";
import { Rules } from "./Rules";
import { useDialogController } from "../Dialog/hooks";

import iconSVG from "../../assets/wordle-icon.svg";

type Props = {
  onStart(): void;
};

export function Introduction({ onStart }: Props) {
  const { ref: dialogRef, showModal, close } = useDialogController();

  return (
    <div className="flex min-h-screen place-content-center place-items-center">
      <div className="flex flex-col items-center gap-4">
        <img src={iconSVG} alt="Logo" className="h-[62px] animate-jump-in" />
        <h1 className="bold text-4xl tracking-wider">вордли</h1>
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
