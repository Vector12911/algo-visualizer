import crypto from "crypto";

export function uniqueId(length = 6) {
  return crypto.randomBytes(length).toString("hex");
}

export function randomNumber() {
  return (Math.floor(Math.random() * 100) + 1).toString();
}

export function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
