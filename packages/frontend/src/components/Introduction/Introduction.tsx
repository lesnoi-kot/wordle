import { Button } from '../Button/Button';
import iconSVG from '../../assets/wordle-icon.svg';

type Props = {
  onStart(): void;
};

export function Introduction({ onStart }: Props) {
  return (
    <div className="min-h-screen flex place-items-center place-content-center">
      <div className="flex flex-col gap-4 items-center">
        <img src={iconSVG} alt="Logo" className="h-[62px]" />
        <h1 className="text-4xl bold tracking-wider">вордли</h1>
        <p className=" text-lg">Угадай слово из 5 букв за 6 раз</p>

        <div className="flex flex-row gap-4">
          <Button>Правила игры</Button>
          <Button primary onClick={onStart}>
            Играть
          </Button>
        </div>
      </div>
    </div>
  );
}
