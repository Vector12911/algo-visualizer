import { COLS, ROWS } from "../context/state";
import { PointI } from "../types";
import { getRandomNumber } from "../utils";

export function randomMaze(): PointI[] {
  const pairs: PointI[] = [];
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const random = getRandomNumber(0, 100);
      if (random % 4 === 0) {
        pairs.push({ x: i, y: j });
      }
    }
  }

  return pairs;
}
