import React from "react";
import { ButtonToolBar, MenuItem, DropdownButton } from "react-bootstrap";
import "./game.css";

function arrClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  };

  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}

const Grid = (props) => {
  const width = props.cols * 14;

  let boxClass = "";

  const rowsArr = props.gridFull.map((rowArr, rowIdx) => {
    rowArr.map((item, colIdx) => {
      const boxId = `${rowIdx}_${colIdx}`;

      boxClass = props.gridFull[rowIdx][colIdx] ? "box on" : "box off";

      return (
        <Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={rowIdx}
          col={colIdx}
          selectBox={this.selectBox}
        />
      );
    });
  });

  return (
    <div className="gird" style={{ width }}>
      {rowsArr}
    </div>
  );
};

class Buttons extends React.Component {
  handleSelect = (eventKey) => {
    this.props.gridSize(eventKey);
  };

  render() {
    return (
      <div className="center">
        <ButtonToolBar>
          <button className="btn btn-default" onClick={this.props.playButton}>
            Play
          </button>
        </ButtonToolBar>
      </div>
    );
  }
}

/* const gridRows = 80;
const gridCols = 200;

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

const BoardGrid = ({ boardStatus, onToggleCellStatus }) => {
  const handleClick = (r, c) => onToggleCellStatus(r, c);

  const tr = [];

  for (let r = 0; r < gridRows; r++) {
    const td = [];

    for (let c = 0; c < gridCols; c++) {
      td.push(
        <td
          key={`${r}, ${c}`}
          className={boardStatus[r][c] ? "alive" : "dead"}
          onClick={() => handleClick(r, c)}
        />
      );
    }
    tr.push(<tr key={r}>{td}</tr>);
  }
  return (
    <table>
      <tbody>{tr}</tbody>
    </table>
  );
};

const Slider = ({ speed, onSpeedChange }) => {
  const handleChange = (e) => onSpeedChange(e.target.value);

  return (
    <input
      type="range"
      min="50"
      max="1000"
      step="50"
      value={speed}
      onChange={handleChange}
    />
  );
};

class Game extends Component {
  state = {
    boardStatus: newBoardStatus(),
    generation: 0,
    isGameRunning: false,
    speed: 500,
  };

  runStopBttn = () => {
    return this.state.isGameRunning ? (
      <button type="button" onClick={this.handleStop}>
        Stop
      </button>
    ) : (
      <button type="button" onClick={this.handleRun}>
        Start
      </button>
    );
  };

  handleClearBoard = () => {
    this.setState({
      boardStatus: newBoardStatus(() => false),
      generation: 0,
    });
  };

  handleNewBoard = () => {
    this.setState({
      boardStatus: newBoardStatus(),
      generation: 0,
    });
  };

  handleToggleCellStatus = (r, c) => {
    const toggleBoardStatus = (prevState) => {
      const clonedBoardStatus = JSON.parse(
        JSON.stringify(prevState.boardStatus)
      );

      clonedBoardStatus[r][c] = !clonedBoardStatus[r][c];

      return clonedBoardStatus;
    };

    this.setState((prevState) => ({
      boardStatus: toggleBoardStatus(prevState),
    }));
  };

  handleStep = () => {
    const nextStep = (prevState) => {
      const boardStatus = prevState.boardStatus;
      const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus));

      const trueNeighborAmount = (r, c) => {
        const neighbors = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, 1],
          [1, 1],
          [1, 0],
          [1, -1],
          [0, -1],
        ];

        return neighbors.reduce((trueNeighbors, neighbor) => {
          const x = r + neighbor[0];
          const y = c + neighbor[1];
          const isNeighborOnBoard =
            x >= 0 && x < gridRows && y >= 0 && y < gridCols;

          if (trueNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
            return trueNeighbors + 1;
          } else {
            return trueNeighbors;
          }
        }, 0);
      };

      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const totalTrueNeighbors = trueNeighborAmount(r, c);

          if (!boardStatus[r][c]) {
            if (totalTrueNeighbors === 3) clonedBoardStatus[r][c] = true;
          } else {
            if (totalTrueNeighbors < 2 || totalTrueNeighbors > 3)
              clonedBoardStatus[r][c] = false;
          }
        }
      }
      return clonedBoardStatus;
    };
    this.setState((prevState) => ({
      boardStatus: nextStep(prevState),
      generation: prevState.generation + 1,
    }));
  };

  handleSpeedChange = (newSpeed) => {
    this.setState({
      speed: newSpeed,
    });
  };

  handleRun = () => {
    this.setState({
      isGameRunning: true,
    });
  };

  handleStop = () => {
    this.setState({
      isGameRunning: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { isGameRunning, speed } = this.state;
    const speedChanged = prevState.speed !== speed;
    const gameStarted = !prevState.isGameRunning && isGameRunning;
    const gameStopped = prevState.isGameRunning && !isGameRunning;

    if ((isGameRunning && speedChanged) || gameStopped) {
      clearInterval(this.timerID);
    }

    if ((isGameRunning && speedChanged) || gameStarted) {
      this.timerID = setInterval(() => {
        this.handleStep();
      }, speed);
    }
  }

  render() {
    const { boardStatus, isGameRunning, generation, speed } = this.state;

    return (
      <div className="game">
        <h1>Game of Life</h1>
        <BoardGrid
          boardStatus={boardStatus}
          onToggleCellStatus={this.handleToggleCellStatus}
        />
        <div className="flexRow upperControls">
          <span>
            {"+ "}
            <Slider speed={speed} onSpeedChange={this.handleSpeedChange} />
            {"- "}
          </span>
          {`Generation: ${generation}`}
        </div>
        <div className="flexRow lowerControls">
          {this.runStopBttn()}
          <button
            type="button"
            disabled={isGameRunning}
            onClick={this.handleStep}
          >
            Step
          </button>
          <button type="button" onClick={this.handleClearBoard}>
            Clear Board
          </button>
          <button type="button" onClick={this.handleNewBoard}>
            New Board
          </button>
        </div>
      </div>
    );
  }
} */
