const { Component } = require("react");

import React, { Component } from "react";

const gridRows = 300;
const gridCols = 400;

const newBoardStatus = (cellStatus = () => Math.random() < 0.3) => {
  const grid = [];

  for (let r = 0; r < gridRows; r++) {
    grid[r] = [];

    for (let c = 0; c < gridCols; c++) {
      grid[r][c] = cellStatus();
    }
  }
  return grid;
};

const BoardGrid = () => {};

const Slider = () => {};

class Game extends Component {
  state = {};

  render() {
    return <div></div>;
  }
}

export default Game;
