'use client';

import { useState } from 'react';
import styles from './page.module.css';
type Board = number[][];

const startBoard: Board = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

export default function Home() {
  const [board, setBoard] = useState<Board>(startBoard);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    cellIndex: number,
  ) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);

    if (isNaN(value) || value < 0 || value > 9) {
      return;
    }

    const newBoard = startBoard.map((row, rIndex) =>
      rIndex === rowIndex ? row.map((cell, cIndex) => (cIndex === cellIndex ? value : cell)) : row,
    );
    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>数独</h1>
      <div className={styles.board}>
        {board.map(
          (
            row,
            rowIndex, // ★ boardを直接使うように変更
          ) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, cellIndex) => {
                // ★ 初期値かどうかを判定
                const isInitialValue = startBoard[rowIndex][cellIndex] !== 0;

                return (
                  <input
                    key={cellIndex}
                    type="number" // 数字キーボードが出やすい
                    className={`${styles.cell} ${isInitialValue ? styles.initial : ''}`}
                    value={cell === 0 ? '' : cell}
                    onChange={(e) => handleInputChange(e, rowIndex, cellIndex)}
                    readOnly={isInitialValue} // ★ 初期値は編集不可に
                  />
                );
              })}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
