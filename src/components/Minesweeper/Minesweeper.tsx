import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./Minesweeper.css";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

const generateBoard = () => {
  const board = Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill({ isMine: false, isOpen: false, isFlagged: false, count: 0 }));

  let minesPlaced = 0;
  while (minesPlaced < MINES) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    if (!board[row][col].isMine) {
      board[row][col] = { ...board[row][col], isMine: true };
      minesPlaced++;
    }
  }

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col].isMine) continue;
      let mineCount = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const r = row + i;
          const c = col + j;
          if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c].isMine) {
            mineCount++;
          }
        }
      }
      board[row][col] = { ...board[row][col], count: mineCount };
    }
  }

  return board;
};

const checkWin = (board: any[][]) => {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = board[row][col];
      if (!cell.isMine && !cell.isOpen) {
        return false;
      }
    }
  }
  return true;
};


const Minesweeper: React.FC = () => {
  const [board, setBoard] = useState(generateBoard());
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleClick = (row: number, col: number) => {
    if (gameOver || win) return;
    if (board[row][col].isFlagged) return;

    const newBoard = [...board];

    if (board[row][col].isMine) {
      newBoard[row][col] = { ...newBoard[row][col], isOpen: true };
      setBoard(newBoard);
      setGameOver(true);
      setModalMessage("💥 Game Over! You hit a mine.");
      setShowModal(true);
      return;
    }

    newBoard[row][col] = { ...newBoard[row][col], isOpen: true };
    setBoard(newBoard);

    if (checkWin(newBoard)) {
      setWin(true);
      setModalMessage("🎉 Congratulations! You Win!");
      setShowModal(true);
    }
  };

  const handleRightClick = (
      event: React.MouseEvent,
      row: number,
      col: number
  ) => {
    event.preventDefault(); // 🔥 Запобігає відкриттю контекстного меню

    if (gameOver || win) return;

    const newBoard = [...board];
    newBoard[row][col] = {
      ...newBoard[row][col],
      isFlagged: !newBoard[row][col].isFlagged,
    };

    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(generateBoard());
    setGameOver(false);
    setWin(false);
    setShowModal(false);
    setModalMessage("");
  };


  return (
      <div>
        <h2>Minesweeper</h2>
        <div className="board">
          {board.map((row, rIndex) => (
              <div key={rIndex} className="row">
                {row.map((cell, cIndex) => (
                    <div
                        key={cIndex}
                        className={`cell ${cell.isOpen ? "open" : ""}`}
                        onClick={() => handleClick(rIndex, cIndex)}
                        onContextMenu={(event) => handleRightClick(event, rIndex, cIndex)}
                    >
                      {cell.isOpen && cell.isMine && "💣"}
                      {cell.isOpen && !cell.isMine && cell.count > 0 && cell.count}
                      {cell.isFlagged && !cell.isOpen && "🚩"}
                    </div>
                ))}
              </div>
          ))}
        </div>
        {showModal && (
            <Modal
                message={modalMessage}
                onClose={() => setShowModal(false)}
                onRestart={resetGame}
            />
        )}

      </div>
  );
};

export default Minesweeper;