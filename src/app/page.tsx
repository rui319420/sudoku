'use client';

import styles from './page.module.css';

type Board = (number | null)[][];

const startBoard: Board = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9],
];
export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>数独</h1>
      <div className={styles.board}>
        {startBoard.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={styles.cell}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
