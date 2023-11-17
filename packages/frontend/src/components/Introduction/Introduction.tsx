import { useState } from 'react';
import { negate } from 'lodash';

import { Button } from '../Button/Button';
import iconSVG from '../../assets/wordle-icon.svg';
import { Rules } from './Rules';

type Props = {
  onStart(): void;
};

export function Introduction({ onStart }: Props) {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="min-h-screen flex place-items-center place-content-center">
      <div className="flex flex-col gap-4 items-center">
        <img src={iconSVG} alt="Logo" className="h-[62px] animate-jump-in" />
        <h1 className="text-4xl bold tracking-wider">вордли</h1>
        <p className=" text-lg">Угадай слово из 5 букв за 6 раз</p>

        <div className="flex flex-row gap-4">
          <Button
            onClick={() => {
              setShowRules(true);
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
        open={showRules}
        onClose={() => {
          setShowRules(false);
        }}
      />
    </div>
  );
}
