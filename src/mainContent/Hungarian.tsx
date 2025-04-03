import React, { useState } from "react";
import { clone, min, subtract, add } from "mathjs";

const hungarianAlg = (costMatr: number[][]): number[] => {
  const n = costMatr.length;
  let cost = clone(costMatr) as number[][];

  cost = cost.map((row: number[]) => {
    const rowMin = min(row);
    return row.map((value) => subtract(value, rowMin));
  });

  for (let j = 0; j < n; j++) {
    const col = cost.map((row) => row[j]);
    const colMin = min(col);
    for (let i = 0; i < n; i++) {
      cost[i][j] = subtract(cost[i][j], colMin);
    }
  }

  const mask: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  const rowCover: boolean[] = Array(n).fill(false);
  const colCover: boolean[] = Array(n).fill(false);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (cost[i][j] === 0 && !rowCover[i] && !colCover[j]) {
        mask[i][j] = 1;
        rowCover[i] = true;
        colCover[j] = true;
      }
    }
  }

  rowCover.fill(false);
  colCover.fill(false);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (mask[i][j] === 1) {
        colCover[j] = true;
      }
    }
  }

  while (colCover.filter((c) => c).length < n) {
    let zeroFound = false;
    let zRow = -1,
      zCol = -1;

    for (let i = 0; i < n && !zeroFound; i++) {
      if (!rowCover[i]) {
        for (let j = 0; j < n; j++) {
          if (!colCover[j] && cost[i][j] === 0) {
            zRow = i;
            zCol = j;
            zeroFound = true;
            break;
          }
        }
      }
    }

    if (!zeroFound) {
      let minVal = Infinity;
      for (let i = 0; i < n; i++) {
        if (!rowCover[i]) {
          for (let j = 0; j < n; j++) {
            if (!colCover[j] && cost[i][j] < minVal) {
              minVal = cost[i][j];
            }
          }
        }
      }

      for (let i = 0; i < n; i++) {
        if (rowCover[i]) {
          for (let j = 0; j < n; j++) {
            cost[i][j] = add(cost[i][j], minVal);
          }
        }
      }

      for (let j = 0; j < n; j++) {
        if (!colCover[j]) {
          for (let i = 0; i < n; i++) {
            cost[i][j] = subtract(cost[i][j], minVal);
          }
        }
      }
      continue;
    }

    mask[zRow][zCol] = 2;

    const starCol = mask[zRow].indexOf(1);
    if (starCol !== -1) {
      rowCover[zRow] = true;
      colCover[starCol] = false;
    } else {
      let path: [number, number][] = [];
      path.push([zRow, zCol]);
      let done = false;
      while (!done) {
        let r = -1;
        for (let i = 0; i < n; i++) {
          if (mask[i][path[path.length - 1][1]] === 1) {
            r = i;
            break;
          }
        }
        if (r === -1) {
          done = true;
        } else {
          path.push([r, path[path.length - 1][1]]);

          const c = mask[r].indexOf(2);
          path.push([r, c]);
        }
      }

      for (const [r, c] of path) {
        if (mask[r][c] === 1) {
          mask[r][c] = 0;
        } else if (mask[r][c] === 2) {
          mask[r][c] = 1;
        }
      }

      rowCover.fill(false);
      colCover.fill(false);
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (mask[i][j] === 2) {
            mask[i][j] = 0;
          }
        }
      }

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (mask[i][j] === 1) {
            colCover[j] = true;
          }
        }
      }
    }
  }

  const result: number[] = Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (mask[i][j] === 1) {
        result[i] = j;
        break;
      }
    }
  }
  return result;
};

const HungarianAssigFrontEnd: React.FC = () => {
  const [dimension, setDimension] = useState<number>(5);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [assignment, setAssignment] = useState<number[]>([]);
  const [optimalValue, setOptimalValue] = useState<number | null>(null);

  const createMatrix = () => {
    const newMatrix = Array.from({ length: dimension }, () =>
      Array.from({ length: dimension }, () => 0)
    );
    setMatrix(newMatrix);
    setAssignment([]);
    setOptimalValue(null);
  };

  const randomizeMatri = () => {
    const newMatrix = Array.from({ length: dimension }, () =>
      Array.from(
        { length: dimension },
        () => Math.floor(Math.random() * 30) + 1
      )
    );
    setMatrix(newMatrix);
    setAssignment([]);
    setOptimalValue(null);
  };

  const handleMatrixValueChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const newMatrix = [...matrix];
    const num = parseFloat(value);
    newMatrix[rowIndex][colIndex] = isNaN(num) ? 0 : num;
    setMatrix(newMatrix);
  };

  const calcuOptimal = () => {
    const result = hungarianAlg(matrix);
    setAssignment(result);
    const total = result.reduce(
      (sum, col, row) => sum + (matrix[row][col] || 0),
      0
    );
    setOptimalValue(total);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        ME5424 hungarian algorithm testing...... mzx
      </h2>
      <div className="mb-4 flex items-center space-x-2">
        <label htmlFor="dimension" className="mr-2">
          Matrix dimension:
        </label>
        <input
          id="dimension"
          type="number"
          min="1"
          value={dimension}
          onChange={(e) => setDimension(parseInt(e.target.value))}
          className="border border-slate-900 p-1"
        />
        <button
          onClick={createMatrix}
          className="bg-slate-500 text-white p-1 rounded"
        >
          create matrix
        </button>
        <button
          onClick={randomizeMatri}
          className="bg-slate-200 text-slate-950 p-1 rounded"
        >
          use a random matrix
        </button>
      </div>

      {matrix.length > 0 && (
        <div className="mb-4">
          <p className="text-xl font-semibold mb-2">cost matrix</p>
          <div className="space-y-2">
            {matrix.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid gap-1"
                style={{
                  gridTemplateColumns: `repeat(${matrix[rowIndex].length}, minmax(0, 1fr))`,
                }}
              >
                {row.map((value, colIndex) => (
                  <input
                    key={colIndex}
                    type="number"
                    value={value}
                    onChange={(e) =>
                      handleMatrixValueChange(
                        rowIndex,
                        colIndex,
                        e.target.value
                      )
                    }
                    className={`border border-gray-300 p-2 text-center ${
                      assignment[rowIndex] === colIndex
                        ? "bg-slate-300 font-bold"
                        : ""
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={calcuOptimal}
              className="bg-slate-600 text-white p-2 rounded"
            >
              solve
            </button>
          </div>
        </div>
      )}

      {assignment.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Assignment result</h3>
          <ul className="list-disc list-inside">
            {assignment.map((col, row) => (
              <li key={row}>{`worker(row) ${row} -> task(column) ${col}`}</li>
            ))}
          </ul>
          {optimalValue !== null && (
            <div className="mt-2 text-lg font-bold">
              optimal cost: {optimalValue}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HungarianAssigFrontEnd;

// compare different algorithm for assignment problem;
// intro intro
// 1. hungarian (km)
// 2. cbba
// 3. dbba
// O(n^3)
