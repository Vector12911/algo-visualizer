//@ts-nocheck

import { PriorityQueue } from "@/dataStructure/priorityQueue"; // Import your pq class here
import { PointI } from "@/types";

function createMatrix(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(100));
}

const rowDirs = [-1, 0, 1, 0];
const colDirs = [0, 1, 0, -1];

export function Dijktras(matrix, startNode, endNode) {
  console.log("DJK...");
  const traversal: PointI[] = [];
  const shortestPath: PointI[] = [];
  // Use a map to store parent nodes for each visited node
  const parentMap = new Map();

  startNode.isWall = false;
  endNode.isWall = false;

  const startRow = startNode.x;
  const startCol = startNode.y;
  const endRow = endNode.x;
  const endCol = endNode.y;

  const numRows = matrix.length;
  const numCols = matrix[0].length;
  const distances = createMatrix(numRows, numCols);

  distances[startRow][startCol] = 0;
  const pq = new PriorityQueue();

  parentMap.set(`${startRow}-${startCol}`, null);
  pq.push({ node: startNode, priority: 0 });

  let reached = false;

  while (!pq.isEmpty() && !reached) {
    const { node: current, priority: currentDistance } = pq.pop();

    const { x, y } = current;

    for (let dir = 0; dir < 4; dir++) {
      const newRow = x + rowDirs[dir];
      const newCol = y + colDirs[dir];

      if (
        newRow < 0 ||
        newRow >= numRows ||
        newCol < 0 ||
        newCol >= numCols ||
        matrix[newRow][newCol].isWall
      ) {
        continue;
      }

      if (newRow === endRow && newCol === endCol) {
        parentMap.set(`${endRow}-${endCol}`, { x, y });
        let currentNode = { x: endRow, y: endCol };
        while (true) {
          const { x, y } = currentNode;
          shortestPath.push({ x, y });
          currentNode = parentMap.get(`${currentNode.x}-${currentNode.y}`);
          if (!currentNode) break;
        }
        reached = true;
        break;
      }

      const weight = matrix[newRow][newCol].hasWeight
        ? matrix[newRow][newCol].weight
        : 1;

      const distanceThroughCurrent = currentDistance + weight;

      if (distanceThroughCurrent < distances[newRow][newCol]) {
        distances[newRow][newCol] = distanceThroughCurrent;
        pq.push({
          node: matrix[newRow][newCol],
          priority: distanceThroughCurrent,
        });

        traversal.push({ x: newRow, y: newCol });
        parentMap.set(`${newRow}-${newCol}`, { x, y });
      }
    }
  }
  shortestPath.reverse();
  return { traversal, shortestPath };
}
