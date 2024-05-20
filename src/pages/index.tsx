import { useEffect, useState } from 'react';
import styles from './index.module.css';

interface Cell {
  mine: boolean;
  neighbors: number;
  revealed: boolean;
  flagged: boolean;
}

const Home = () => {
  const boardRow = 10;
  const boardCol = 10;
  const bom = 20;
  const [restBom, setRestBom] = useState<number>(bom);
  const [board, setBoard] = useState<Cell[][]>([]);
  const [first, setFirst] = useState<boolean>(true);
  const [lose, setLose] = useState<number>(12);

  const directions = [
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
  ];

  const genBoard = (board_Row: number, board_Col: number) => {
    const newArr: Cell[][] = [];
    for (let i = 0; i < board_Row; i++) {
      const arr: Cell[] = [];
      for (let j = 0; j < board_Col; j++) {
        arr.push({
          mine: false,
          neighbors: 0,
          revealed: false,
          flagged: false,
        });
      }
      newArr.push(arr);
    }

    return newArr;
  };

  useEffect(() => {
    setBoard(genBoard(boardRow, boardCol));
  }, []);

  const handleTurnOver = (x: number, y: number) => {
    if (board[y][x].flagged) {
      return;
    }
    if (board[y][x].mine) {
      for (const y of board) {
        for (const x of y) {
          if (x.mine) {
            x.revealed = true;
          }
        }
      }
      setLose(14);
      return;
    }
    const newArr = [...board];
    if (first) {
      const bomPlaseIndex: number[] = [];
      while (bomPlaseIndex.length < bom) {
        const a = Math.floor(Math.random() * (boardRow * boardCol));
        if (!bomPlaseIndex.includes(a) && (y !== Math.floor(a / boardCol) || x !== a % boardCol)) {
          bomPlaseIndex.push(a);
        }
      }
      for (const x of bomPlaseIndex) {
        const row = Math.floor(x / boardCol);
        const col = x % boardCol;

        newArr[row][col].mine = true;
      }

      for (let i = 0; i < boardRow; i++) {
        for (let j = 0; j < boardCol; j++) {
          for (const d of directions) {
            if (newArr[i + d[0]] !== undefined) {
              if (newArr[i + d[0]][j + d[1]] !== undefined) {
                if (newArr[i + d[0]][j + d[1]].mine) {
                  newArr[i][j].neighbors++;
                }
              }
            }
          }
        }
      }
      setBoard(newArr);
      setFirst(false);
    }

    const turnOver = (tx: number, ty: number, arr: Cell[][]) => {
      if (arr[ty][tx].neighbors !== 0) return;
      for (const d of directions) {
        if (arr[ty + d[0]] !== undefined) {
          if (arr[ty + d[0]][tx + d[1]] !== undefined) {
            if (
              !arr[ty + d[0]][tx + d[1]].revealed &&
              !arr[ty + d[0]][tx + d[1]].mine &&
              arr[ty + d[0]][tx + d[1]].neighbors === 0
            ) {
              arr[ty + d[0]][tx + d[1]].revealed = true;
              turnOver(tx + d[1], ty + d[0], arr);
            } else if (arr[ty + d[0]][tx + d[1]].neighbors !== 0) {
              for (const e of directions) {
                if (arr[ty + e[0]] !== undefined) {
                  if (
                    arr[ty + e[0]][tx + e[1]] !== undefined &&
                    arr[ty + e[0]][tx + e[1]].neighbors !== 0 &&
                    !arr[ty + e[0]][tx + e[1]].mine
                  ) {
                    arr[ty + e[0]][tx + e[1]].revealed = true;
                  }
                }
              }
            }
          }
        }
      }
    };

    newArr[y][x].revealed = true;
    turnOver(x, y, newArr);
    setBoard(newArr);
    let num = 0;
    for (const y of newArr) {
      for (const x of y) {
        if (x.revealed) {
          num++;
        }
      }
    }

    if (num === boardCol * boardRow - bom) {
      setLose(13);
      return;
    }
  };

  const handleRightClick = (event: React.MouseEvent, x: number, y: number) => {
    event.preventDefault(); // デフォルトのコンテキストメニューを無効化
    const newarr = [...board];
    newarr[y][x].flagged = !newarr[y][x].flagged;
    if (newarr[y][x].flagged) {
      setRestBom(restBom - 1);
    } else {
      setRestBom(restBom + 1);
    }
    setBoard(newarr);
  };

  const handleReset = () => {
    setBoard(genBoard(boardRow, boardCol));
    setRestBom(bom);
    setFirst(true);
    setLose(12);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gamecontainer}>
        <div className={styles.topbar}>
          <div className={styles.display}>{restBom}</div>
          <div
            className={styles.emoji}
            style={{ backgroundPositionX: 30 - 30 * lose }}
            onClick={() => handleReset()}
          />
          <div className={styles.display}>11</div>
        </div>
        <div className={styles.board}>
          {board.map((row, y) => (
            <div className={styles.row} key={y}>
              {row.map((col, x) =>
                col.revealed ? (
                  col.mine ? (
                    <div
                      key={`${x}-${y}`}
                      className={styles.cell}
                      style={{ backgroundPositionX: 24 - 24 * 11 }}
                    />
                  ) : (
                    <div
                      key={`${x}-${y}`}
                      className={styles.cell}
                      style={{ backgroundPositionX: 24 - 24 * col.neighbors }}
                    />
                  )
                ) : col.flagged ? (
                  <button
                    className={styles.cover}
                    style={{
                      backgroundPositionX: 24 - 24 * 10,
                    }}
                    key={`${x}-${y}`}
                    onClick={() => handleTurnOver(x, y)}
                    onContextMenu={(event) => handleRightClick(event, x, y)}
                  />
                ) : (
                  <button
                    className={styles.cover}
                    style={{
                      backgroundPositionX: 24,
                    }}
                    key={`${x}-${y}`}
                    onClick={() => handleTurnOver(x, y)}
                    onContextMenu={(event) => handleRightClick(event, x, y)}
                  />
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
