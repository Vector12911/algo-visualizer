//@ts-nocheck

import { getRandomNumber } from "../utils";

const traversal = [];

function solve(x1: number, y1: number, x2: number, y2: number) {
  if (x2 - x1 < 3 || y2 - y1 < 3) {
    return;
  }

  const wallX = getRandomNumber(x1, x2);
  const wallY = getRandomNumber(y1, y2);

  const top = [],
    left = [],
    right = [],
    bottom = [];

  for (let i = 0; i < wallX; i++) top.push({ x: i, y: wallY });
  for (let i = 0; i < wallY; i++) left.push({ x: wallX, y: i });
  for (let i = wallX; i <= x2; i++) bottom.push({ x: i, y: wallY });
  for (let i = wallY; i <= y2; i++) right.push({ x: wallX, y: i });

  const walls = [top, left, bottom, right];
  const randomWallIndexArr = getRandomArray(3);

  for (let index of randomWallIndexArr) {
    const wallArr = walls[index];
    const randomIndex = getRandomNumber(0, wallArr.length);
    wallArr.splice(randomIndex, 1);
  }

  traversal.push(...top);
  traversal.push(...left);
  traversal.push(...bottom);
  traversal.push(...right);

  solve(x1, y1, wallX - 1, wallY - 1);
  solve(wallX + 1, y1, x2, wallY - 1);
  solve(wallX + 1, wallY + 1, x2, y2);
  solve(x1, wallY + 1, wallX - 1, y2);
}

export function recursiveDivision(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  solve(x1, y1, x2, y2);
  return traversal;
}
const getRandomArray = (length: number) => {
  const result = [];
  const possibleValues = [0, 1, 2, 3];

  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomNumber(0, possibleValues.length);
    const randomValue = possibleValues.splice(randomIndex, 1)[0];
    result.push(randomValue);
  }

  return result;
};
