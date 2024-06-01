import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

interface Cell {
  mine: boolean;
  neighbors: number;
  revealed: boolean;
  flagged: boolean;
}

const Home = () => {
  const [level, setLevel] = useState<'soft' | 'standerd' | 'hard' | 'costom'>('soft');
  const [boardRow, setBoardRow] = useState<number>(9);
  const [boardCol, setBoardCol] = useState<number>(9);
  const [bom, setBom] = useState<number>(10);
  const [restBom, setRestBom] = useState<number>(10);
  const [board, setBoard] = useState<Cell[][]>([]);
  const [first, setFirst] = useState<boolean>(true);
  const [lose, setLose] = useState<number>(12);
  const [time, setTime] = useState<number>(0);
  const timerRef = useRef<number | undefined>(undefined);

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

  const levelSet = useCallback((lev: 'soft' | 'standerd' | 'hard' | 'costom') => {
    if (lev === 'soft') {
      setBoardRow(9);
      setBoardCol(9);
      setBom(10);
    } else if (lev === 'standerd') {
      setBoardRow(16);
      setBoardCol(16);
      setBom(40);
    } else if (lev === 'hard') {
      setBoardRow(16);
      setBoardCol(30);
      setBom(10);
    } else if (lev === 'costom') {
      setBoardRow(9);
      setBoardCol(9);
      setBom(10);
    }
  }, []);

  const genBoard = useCallback(() => {
    const newArr: Cell[][] = [];
    for (let i = 0; i < boardRow; i++) {
      const arr: Cell[] = [];
      for (let j = 0; j < boardCol; j++) {
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
  }, [boardRow, boardCol]);

  useEffect(() => {
    levelSet(level);
  }, [level, levelSet]);

  useEffect(() => {
    setBoard(genBoard());
    setRestBom(bom);
    setFirst(true);
    setLose(12);
  }, [boardRow, boardCol, genBoard, bom]);
  useEffect(() => {
    if (!first) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000) as unknown as number;
    } else {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  }, [first]);

  const handleTurnOver = (x: number, y: number) => {
    if (lose === 13) {
      return;
    }
    if (lose === 14) {
      return;
    }
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
      clearInterval(timerRef.current);
      timerRef.current = undefined;
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

    if (num === boardRow * boardCol - bom) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
      setLose(13);
      return;
    }
  };

  const handleRightClick = (event: React.MouseEvent, x: number, y: number) => {
    if (lose === 14) {
      return;
    }
    event.preventDefault();
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
    setBoard(genBoard());
    setRestBom(bom);
    setFirst(true);
    setLose(12);
    setTime(0);
  };

  const handleLevel = (e: 'soft' | 'standerd' | 'hard' | 'costom') => {
    setLevel(e);
  };

  return (
    <div className={styles.container}>
      <div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div
            onClick={() => handleLevel('soft')}
            style={{ fontWeight: level === 'soft' ? 'bold' : 'normal', cursor: 'pointer' }}
          >
            初級
          </div>
          <div
            onClick={() => handleLevel('standerd')}
            style={{ fontWeight: level === 'standerd' ? 'bold' : 'normal', cursor: 'pointer' }}
          >
            中級
          </div>
          <div
            onClick={() => handleLevel('hard')}
            style={{ fontWeight: level === 'hard' ? 'bold' : 'normal', cursor: 'pointer' }}
          >
            上級
          </div>
          <div
            onClick={() => handleLevel('costom')}
            style={{
              fontWeight: level === 'costom' ? 'bold' : 'normal',
              cursor: 'pointer',
            }}
          >
            カスタム
          </div>
          {level === 'costom' ? (
            <form>
              <label htmlFor="row">row</label>
              <input
                type="number"
                name="row"
                id="row"
                onChange={(e) => {
                  setBoardRow(Number(e.target.value));
                }}
              />
              <label htmlFor="col">col</label>
              <input
                type="number"
                name="col"
                id="col"
                onChange={(e) => {
                  setBoardCol(Number(e.target.value));
                }}
              />
              <label htmlFor="bom">bom</label>
              <input
                type="number"
                name="bom"
                id="bom"
                onChange={(e) => {
                  setBom(Number(e.target.value));
                }}
              />
              <input type="submit" value="更新" />
            </form>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={styles.gamecontainer}>
        <div className={styles.topbar}>
          <div className={styles.display}>{restBom}</div>
          <div
            className={styles.emoji}
            style={{ backgroundPositionX: 30 - 30 * lose }}
            onClick={() => handleReset()}
          />
          <div className={styles.display}>{time}</div>
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
                      style={{ backgroundPositionX: 20 - 20 * 11 }}
                    />
                  ) : (
                    <div
                      key={`${x}-${y}`}
                      className={styles.cell}
                      style={{ backgroundPositionX: 20 - 20 * col.neighbors }}
                    />
                  )
                ) : col.flagged ? (
                  <button
                    className={styles.cover}
                    style={{
                      backgroundPositionX: 20 - 20 * 10,
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
