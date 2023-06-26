import React, { useState, useEffect } from "react";
import './connect4.css'

const ROWS = 6;
const COLS = 7;

const initialBoard = Array(ROWS).fill(Array(COLS).fill(null));

const Connect4 = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isComputersTurn, setIsComputersTurn] = useState(false);

  useEffect(() => {
    if (isComputersTurn && !winner) {
      setTimeout(makeComputersMove, 500); // Delay the computer's move for better UX
    }
  }, [isComputersTurn, winner]);

  const makeMove = (column) => {
    if (winner || board[0][column]) {
      return; // Ignore if game is over or column is full
    }

    const newBoard = board.map((row) => [...row]);

    for (let i = ROWS - 1; i >= 0; i--) {
      if (!newBoard[i][column]) {
        newBoard[i][column] = currentPlayer;
        break;
      }
    }

    setBoard(newBoard);
    const isWinningMove = checkWin(newBoard, currentPlayer);

    if (isWinningMove) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      setIsComputersTurn(true);
    }
  };

  const makeComputersMove = () => {
    const availableColumns = [];

    for (let j = 0; j < COLS; j++) {
      if (!board[0][j]) {
        availableColumns.push(j);
      }
    }

    const randomColumn =
      availableColumns[Math.floor(Math.random() * availableColumns.length)];
    makeMove(randomColumn);
    setIsComputersTurn(false);
  };

  const checkWin = (board, player) => {
    // Check rows for a win
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS - 3; j++) {
        if (
          board[i][j] === player &&
          board[i][j + 1] === player &&
          board[i][j + 2] === player &&
          board[i][j + 3] === player
        ) {
          return true;
        }
      }
    }

    // Check columns for a win
    for (let i = 0; i < ROWS - 3; i++) {
      for (let j = 0; j < COLS; j++) {
        if (
          board[i][j] === player &&
          board[i + 1][j] === player &&
          board[i + 2][j] === player &&
          board[i + 3][j] === player
        ) {
          return true;
        }
      }
    }

    // Check diagonals (top left to bottom right) for a win
    for (let i = 0; i < ROWS - 3; i++) {
      for (let j = 0; j < COLS - 3; j++) {
        if (
          board[i][j] === player &&
          board[i + 1][j + 1] === player &&
          board[i + 2][j + 2] === player &&
          board[i + 3][j + 3] === player
        ) {
          return true;
        }
      }
    }

    // Check diagonals (top right to bottom left) for a win
    for (let i = 0; i < ROWS - 3; i++) {
      for (let j = 3; j < COLS; j++) {
        if (
          board[i][j] === player &&
          board[i + 1][j - 1] === player &&
          board[i + 2][j - 2] === player &&
          board[i + 3][j - 3] === player
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer("X");
    setWinner(null);
    setIsComputersTurn(false);
  };

  return (
    <div className="connect4">
      <h1>Connect 4</h1>
      {winner ? (
        <div className="message">
          {winner === "X" ? "You win!" : "Computer wins!"}
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div className="message">
          {isComputersTurn ? "Computer is thinking..." : "Your turn"}
        </div>
      )}
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                onClick={() => makeMove(colIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connect4;
