//@ts-nocheck

import { Queue } from "@/dataStructure/queue";

const rowDirs = [-1, 0, 1, 0];
const colDirs = [0, 1, 0, -1];

export function BFS(matrix, startNode, endNode) {
  console.log("BFS...");
  const traversal: PointI[] = [];
  const shortestPath: PointI[] = [];
  // Use a map to store parent nodes for each visited node
  const parentMap = new Map();

  const startRow = startNode.x;
  const startCol = startNode.y;
  const endRow = endNode.x;
  const endCol = endNode.y;

  const numRows = matrix.length;
  const numCols = matrix[0].length;
  const visited = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false)
  );
  const queue = new Queue();

  queue.enqueue({ row: startRow, col: startCol });
  parentMap.set(`${startRow}-${startCol}`, null);
  visited[startRow][startCol] = true;

  while (!queue.isEmpty()) {
    const { row, col } = queue.dequeue();

    for (let dir = 0; dir < 4; dir++) {
      const newRow = row + rowDirs[dir];
      const newCol = col + colDirs[dir];

      if (newRow === endRow && newCol === endCol) {
        parentMap.set(`${endRow}-${endCol}`, { x: row, y: col });
        let currentNode = { x: endRow, y: endCol };
        while (true) {
          const { x, y } = currentNode;
          shortestPath.push({ x, y });
          currentNode = parentMap.get(`${currentNode.x}-${currentNode.y}`);
          if (!currentNode) break;
        }
        shortestPath.reverse();
        return { traversal, shortestPath };
      }

      if (
        newRow >= 0 &&
        newRow < numRows &&
        newCol >= 0 &&
        newCol < numCols &&
        !matrix[newRow][newCol].isWall &&
        !visited[newRow][newCol]
      ) {
        queue.enqueue({ row: newRow, col: newCol });
        traversal.push({ x: newRow, y: newCol });
        parentMap.set(`${newRow}-${newCol}`, { x: row, y: col });
        visited[newRow][newCol] = true;
      }
    }
  }
}
