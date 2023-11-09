import { useState } from 'react';

import { Introduction } from './components/Introduction/Introduction';
import { Game } from './components/Game/Game';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <>
      {!gameStarted && (
        <Introduction
          onStart={() => {
            setGameStarted(true);
          }}
        />
      )}

      {gameStarted && <Game />}
    </>
  );
}

export default App;
