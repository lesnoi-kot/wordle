import { useState } from "react";

import { Introduction } from "./components/Introduction/Introduction";
import { Game } from "./components/Game/Game";
import { Toasts } from "./components/Toasts/Toasts";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return (
      <Introduction
        onStart={() => {
          setGameStarted(true);
        }}
      />
    );
  }

  return (
    <div className="relative mx-auto max-w-5xl">
      <Game />

      <div className="absolute right-0 top-0 mr-4 mt-12 xs:mt-[6rem]">
        <Toasts />
      </div>
    </div>
  );
}

export default App;
