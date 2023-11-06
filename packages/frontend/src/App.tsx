import { useState } from 'react';

import './App.css';
import { Keyboard } from './components/Keyboard/Keyboard';

function App() {
  return (
    <>
      <h1>Wordle</h1>
      <Keyboard></Keyboard>
    </>
  );
}

export default App;
