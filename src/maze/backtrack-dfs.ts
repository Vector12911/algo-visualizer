// @ts-nocheck

import { getRandomNumber } from "../utils";

const rowDirs = [-2, 0, 2, 0];
const colDirs = [0, 2, 0, -2];
let traversal: PointI[] = [];

function getNeighbors(startX, startY) {
  const list = [];
  for (let dir = 0; dir < 4; dir++) {
    const newRow = startX + rowDirs[dir];
    const newCol = startY + colDirs[dir];
    list.push({ newRow, newCol });
  }
  return list;
}

function removeWall(matrix, x1, y1, x2, y2) {
  let x, y;
  if (x1 === x2) {
    x = x1;
    y = Math.min(y1, y2) + 1;
  } else if (y1 === y2) {
    x = Math.min(x1, x2) + 1;
    y = y1;
  }
  matrix[x][y].isWall = false;
  return { x, y };
}

function DfsTraversal(matrix, startX, startY, visited, parentMap) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  const neighbors = getNeighbors(startX, startY);

  for (let dir = 0; dir < 4; dir++) {
    const randomIndex = getRandomNumber(0, neighbors.length - 1);
    const { newRow, newCol } = neighbors[randomIndex];
    neighbors[randomIndex] = neighbors[neighbors.length - 1];
    neighbors.pop();

    if (
      newRow >= 0 &&
      newRow < numRows &&
      newCol >= 0 &&
      newCol < numCols &&
      !visited[newRow][newCol]
    ) {
      const removedWall = removeWall(matrix, startX, startY, newRow, newCol);
      traversal.push(removedWall);
      traversal.push({ x: newRow, y: newCol });
      parentMap.set(`${newRow}-${newCol}`, { x: startX, y: startY });
      visited[newRow][newCol] = true;

      DfsTraversal(matrix, newRow, newCol, visited, parentMap);
    }
  }
}
export function BacktrackRandomMaze(matrix, startRow, startCol) {
  traversal = [];
  // map to store parent nodes for each visited node
  const parentMap = new Map();

  const numRows = matrix.length;
  const numCols = matrix[0].length;
  const visited = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false)
  );

  parentMap.set(`${startRow}-${startCol}`, null);
  visited[startRow][startCol] = true;
  matrix[startRow][startCol].isWall = false;
  DfsTraversal(matrix, startRow, startCol, visited, parentMap);
  return traversal;
}
