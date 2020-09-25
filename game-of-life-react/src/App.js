import React from "react";
import "./App.css";

import Rules from "./rules/rules";
import Game from "./game/game";

function App() {
  return (
    <div className="App">
      <Game />
      <Rules />
    </div>
  );
}

export default App;
