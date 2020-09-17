import React from "react";
import "./App.css";

import Rules from "./rules";
import Game from "./game";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Game />
        <Rules />
      </header>
    </div>
  );
}

export default App;
