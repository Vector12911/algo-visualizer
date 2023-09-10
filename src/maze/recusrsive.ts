//@ts-nocheck

import { COLS, ROWS } from "../context/state";

export function recussiveMaze(x1: number, y1: number, x2: number, y2: number) {
  const maze = new Array(ROWS).fill().map(() => new Array(COLS).fill(true)); // Initialize all cells as walls

  if (x2 - x1 < 2 || y2 - y1 < 2) {
    return;
  }

  // Choose a random point within the area
  const wallX = getRandomEven(x1 + 1, x2 - 1);
  const wallY = getRandomEven(y1 + 1, y2 - 1);

  // Create a horizontal or vertical wall
  if (Math.random() < 0.5) {
    const passageX = getRandomEven(x1, x2);
    for (let i = x1; i <= x2; i++) {
      if (i !== passageX) {
        maze[i][wallY] = 1; // 1 represents a wall
      }
    }
    recussiveMaze(x1, y1, x2, wallY - 1);
    recussiveMaze(x1, wallY + 1, x2, y2);
  } else {
    const passageY = getRandomEven(y1, y2);
    for (let i = y1; i <= y2; i++) {
      if (i !== passageY) {
        maze[wallX][i] = 1; // 1 represents a wall
      }
    }
    recussiveMaze(x1, y1, wallX - 1, y2);
    recussiveMaze(wallX + 1, y1, x2, y2);
  }

  // Return the generated maze
  const pairs = [];
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (maze[i][j]) {
        pairs.push({ x: i, y: j });
      }
    }
  }
  console.log(maze);
  return pairs;
}

function getRandomEven(min: number, max: number): number {
  // Generate a random even number between min and max
  min = Math.ceil(min / 2) * 2;
  max = Math.floor(max / 2) * 2;
  return Math.floor(Math.random() * ((max - min) / 2 + 1)) * 2 + min;
}
