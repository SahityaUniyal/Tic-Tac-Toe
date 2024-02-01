/* eslint-disable react/prop-types */
import Square from "./Square";
import { useState } from "react";
import "./Board.css";
function Board() {
  let [squares, setSquares] = useState(Array(9).fill(null));
  let [turn, setTurn] = useState(true);
  let [winIndex, setWinIndex] = useState(null);
  let gameStatus = updateGameStatus(squares, turn);
  function handleClick(i) {
    // not to change square if it already holds a value
    // if there is a winner or draw
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // copies the square array in sq
    const sq = squares.slice();
    sq[i] = turn ? "X" : "0";
    setTurn(!turn);
    // change the color if there is a winner in sq
    let result = calculateWinner(sq);
    if (result) {
      setWinIndex(result.line);
    }
    setSquares(sq);
  }
  function restart() {
    setSquares(Array(9).fill(null));
    setTurn(true);
    setWinIndex(null);
    gameStatus = updateGameStatus(squares, turn);
  }
  return (
    <>
      <button className="btn-restart" onClick={restart}>
        Restart
      </button>
      <h2>{gameStatus}</h2>
      <div className="board-row">
        <Square
          id="0"
          winIndex={winIndex}
          handleClick={handleClick}
          value={squares[0]}
        />
        <Square
          id="1"
          winIndex={winIndex}
          handleClick={handleClick}
          value={squares[1]}
        />
        <Square
          id="2"
          winIndex={winIndex}
          handleClick={handleClick}
          value={squares[2]}
        />
      </div>
      <div className="board-row">
        <Square
          id="3"
          winIndex={winIndex}
          handleClick={handleClick}
          value={squares[3]}
        />
        <Square
          id="4"
          winIndex={winIndex}
          handleClick={handleClick}
          value={squares[4]}
        />
        <Square
          id="5"
          winIndex={winIndex}
          handleClick={handleClick}
          value={squares[5]}
        />
      </div>
      <div className="board-row">
        <Square
          id="6"
          winIndex={winIndex}
          handleClick={handleClick}
          value={squares[6]}
        />
        <Square
          id="7"
          winIndex={winIndex}
          handleClick={handleClick}
          value={squares[7]}
        />
        <Square
          id="8"
          winIndex={winIndex}
          handleClick={handleClick}
          value={squares[8]}
        />
      </div>
    </>
  );
}
function updateGameStatus(squares, turn) {
  let winObj = calculateWinner(squares);
  const winner = winObj && winObj.winner;
  if (winner === "Draw") {
    return "Match Draw";
  } else if (winner) {
    return "Winner is " + winner;
  } else {
    return "Your Turn : " + (turn ? "X" : 0);
  }
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let i = 0;
  let allFilled = true;
  for (i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // check for complete blocks are filled
    if (!squares[a] || !squares[b] || !squares[c]) {
      allFilled = false;
    }
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  if (allFilled) {
    return { winner: "Draw", line: null };
  }
  return null;
}
export default Board;
