import * as React from 'react';
import './style.css';

const { useState } = React;

type SquareConfigType = {
  value: any;
  onClick: any;
}

const Square = (config: SquareConfigType) => {
  const { value, onClick } = config;

  return (
    <button className="square" onClick={ onClick }>
      { value }
    </button>
  );
}

type BoardConfigType = {
  squares: any;
  onClick: any;
}

const Board = (config: BoardConfigType) => {
  const { squares, onClick } = config;

  const renderSquare = (i: any) => {
    return (
      <Square
        value={ squares[i] }
        onClick={() => onClick(i)}
      />)
    ;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const useGameState = () => {
  const [gameState, setGameState] = useState({
    history: [{
      squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true,
  });

  const handleClick = (i: number) => {
    var history = gameState.history.slice(0, gameState.stepNumber + 1);
    var current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = gameState.xIsNext ? 'X' : 'O';

    setGameState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !gameState.xIsNext,
    });
  }

  const jumpTo = (step: number) => {
    setGameState({
      ...gameState,
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  return {
    gameState,
    handleClick,
    jumpTo
  }
;}

const Game = () => {

  const { gameState, handleClick, jumpTo } = useGameState();



  const history = gameState.history;
  const current = history[gameState.stepNumber];

  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (gameState.xIsNext ? 'X' : 'O');
  }

  const moves = history.map((step, move) => {
    const desc = move ?
      'Move #' + move :
      'Game start';
    return (
      <li key={move}>
        <a onClick={() => jumpTo(move)}>{desc}</a>
      </li>
    );
  });

  return (
    <div className="game">
      <div>
        <Board
          squares={current.squares}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// =======================================

function calculateWinner(squares: any) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default Game;
