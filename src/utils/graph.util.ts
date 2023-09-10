import crypto from "crypto";

export function uniqueId(length = 6) {
  return crypto.randomBytes(length).toString("hex");
}

export function randomNumber() {
  return (Math.floor(Math.random() * 100) + 1).toString();
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRandomNumber(min: number, max: number) {
  const randomDecimal = Math.random();
  const randomInRange = min + randomDecimal * (max - min);
  return Math.floor(randomInRange);
}

export function removeWalls(matrix: any) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      matrix[i][j].isWall = false;
    }
  }
}
export function fillWalls(matrix: any) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      matrix[i][j].isWall = true;
    }
  }
}
