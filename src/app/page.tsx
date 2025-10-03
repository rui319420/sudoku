'use client';

import { useState } from 'react';
import styles from './page.module.css';

type Board = number[][];

//すべての数字を!==でつなげばいけるかも
//1~9の和は45
//

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
  const sumBox =
    startBoard[0][0] +
    startBoard[0][1] +
    startBoard[0][2] +
    startBoard[1][0] +
    startBoard[1][1] +
    startBoard[1][2] +
    startBoard[2][0] +
    startBoard[2][1] +
    startBoard[2][2];
  console.log(sumBox);

  let sumRow = 0;
  const firstRow = startBoard[0];
  for (const num of firstRow) {
    sumRow += num;
  }
  console.log(sumRow);

  let sumCol = 0;
  for (const row of startBoard) {
    sumCol += row[0];
  }
  console.log(sumCol);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    cellIndex: number,
  ) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);

    if (isNaN(value) || value < 0 || value > 9) {
      return;
    }

    // const clickHandler = (x: number, y: number) => {
    //   const isValid = (board: number, row: number, col: number, num: number): boolean => {
    //     if (num === 0) return true;
    //     for (let x = 0; x < 9; x++) {
    //       if (board[row][x] === num && x !== col) {
    //         return false;
    //       }
    //     }
    //     for (let y = 0; y < 9; y++) {
    //       if (board[y][col] === num && y !== row) {
    //         return false;
    //       }
    //     }
    //     return true;
    //   };
    // };

    const newBoard = board.map((row, rIndex) =>
      rIndex === rowIndex ? row.map((cell, cIndex) => (cIndex === cellIndex ? value : cell)) : row,
    );
    setBoard(newBoard);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.title}>数独</h1>
        <div className={styles.board}>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, cellIndex) => {
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
          ))}
        </div>
      </div>
    </div>
  );
}
