import { COLS, ROWS } from "../context/state";
import { PointI } from "../types";

export function randomMaze(): PointI[] {
  const pairs: PointI[] = [];
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const random = getRandomNumber(0, 100);
      if (random % 3 === 0) {
        pairs.push({ x: i, y: j });
      }
    }
  }

  return pairs;
}

function getRandomNumber(min: number, max: number) {
  const randomDecimal = Math.random();
  const randomInRange = min + randomDecimal * (max - min);
  return Math.floor(randomInRange);
}
