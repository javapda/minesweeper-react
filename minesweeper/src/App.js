import React, { useState } from 'react';

import './App.css';

import Minesweeper from './components/Minesweeper';
function App() {
  const [active, setActive] = useState(false);
  const onClickHandler = (event) => {
    console.log("clicked");
    setActive(prevActive=>!prevActive);

  };
  return (
    <div className="App">
      <header>
      </header>
      <main>
        <Minesweeper />
      </main>
    </div>
  );
}

export default App;
