/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

const Game = () => {
  const [next, setnext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentmove, setcurrentmove] = useState(0);
  const temp = history[currentmove];

  const handleplay = (newcopy) => {
    const new_arr = [...history.slice(0, currentmove + 1), newcopy];
    setHistory(new_arr);
    setcurrentmove(new_arr.length - 1);
    setnext(!next);
  };

  const clickable = (move) => {
    setcurrentmove(move);
    setnext(move % 2 === 0);
  };

  const moves = history.map((squares, move) => {
    let temp;
    if (move > 0) {
      temp = "Go to move #" + move;
    } else {
      temp = "Move to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => clickable(move)}>{temp}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <App handleplay={handleplay} squares={temp} next={next} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

const App = ({ next, squares, handleplay }) => {
  const handleclick = (index) => {
    if (winnercalculator(squares) || squares[index]) {
      return;
    }
    const newcopy = squares.slice();
    if (next) {
      newcopy[index] = "X";
    } else {
      newcopy[index] = "O";
    }
    handleplay(newcopy);
  };

  const temp = winnercalculator(squares);
  let out;
  if (temp) {
    out = "Winner - " + temp;
  } else {
    out = "Next Player is " + (next ? "X" : "O");
  }

  return (
    <>
      <div className="status">{out}</div>
      <div className="board-row">
        <Sqaure value={squares[0]} onboxclick={() => handleclick(0)} />
        <Sqaure value={squares[1]} onboxclick={() => handleclick(1)} />
        <Sqaure value={squares[2]} onboxclick={() => handleclick(2)} />
      </div>
      <div className="board-row">
        <Sqaure value={squares[3]} onboxclick={() => handleclick(3)} />
        <Sqaure value={squares[4]} onboxclick={() => handleclick(4)} />
        <Sqaure value={squares[5]} onboxclick={() => handleclick(5)} />
      </div>
      <div className="board-row">
        <Sqaure value={squares[6]} onboxclick={() => handleclick(6)} />
        <Sqaure value={squares[7]} onboxclick={() => handleclick(7)} />
        <Sqaure value={squares[8]} onboxclick={() => handleclick(8)} />
      </div>
    </>
  );
};

const winnercalculator = (squares) => {
  const line = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < line.length; i++) {
    const [a, b, c] = line[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

function Sqaure({ value, onboxclick }) {
  return (
    <button className="square" onClick={onboxclick}>
      {value}
    </button>
  );
}

export default Game;
