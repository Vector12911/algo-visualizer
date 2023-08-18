//@ts-nocheck
"use client";

import { BFS } from "@/algorithms/bfs";
import { Dijktras } from "@/algorithms/dijktras";
import Cell from "@/components/cell";
import Header from "@/components/header";
import { Point } from "@/types";
import { useEffect, useState } from "react";
import { useStateContext } from "../context/state";

export default function PathFinder() {
  const [pressed, setPressed] = useState(false);
  const [_, setfakeState] = useState(null);

  const {
    globalState,
    matrix,
    source,
    setSource,
    destination,
    setDestination,
  } = useStateContext();

  console.log(globalState);
  const { graphType, currentAlgo, animationSpeed } = globalState;

  const runAlgorithm = () => {
    if (!source || !destination) return;
    let res = null;
    if (currentAlgo === "bfs") res = BFS(matrix, source, destination);
    else if (currentAlgo === "djk") res = Dijktras(matrix, source, destination);
    const { traversal, shortestPath } = res;
    animateAlgorithm(traversal, shortestPath);
  };

  const animateAlgorithm = (traversal, shortestPath) => {
    for (let i = 0; i < traversal.length; i++) {
      setTimeout(() => {
        const { x, y } = traversal[i];
        matrix[x][y].isInTraversalPath = true;
        setfakeState(i);
      }, 100 * i);
    }

    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const { x, y } = shortestPath[i];
        matrix[x][y].isInShortestPath = true;
        setfakeState(i);
      }, 100 * (traversal.length + i));
    }
  };

  const handleMouseDown = (node) => {
    const { x, y } = node;
    if (!source) {
      node.isStart = true;
      setSource(node);
    } else if (!destination) {
      node.isEnd = true;
      setDestination(node);
    }
    matrix[x][y] = node;
    setPressed(true);
  };

  const handleMouseEnter = (node) => {
    const { x, y } = node;
    if (pressed) {
      node.isWall = true;
      matrix[x][y] = node;
      setfakeState(`${x}-${y}`);
    }
  };

  return (
    <main className="container">
      <Header runAlgorithm={runAlgorithm} />
      <div>
        {matrix.map((row, rowIndex) => (
          <div key={`${rowIndex}-${new Date().getTime()}`} className="flex">
            {row.map((cell, colIndex) => (
              <button
                onMouseEnter={() => handleMouseEnter(cell)}
                onMouseDown={() => handleMouseDown(cell)}
                onMouseUp={() => setPressed(false)}
                key={`${cell.x}-${cell.y}`}
                className={`p-2 border w-5 h-5 ${status(cell)}`}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

const status = (node: any) => {
  if (node.isStart) return "bg-green-400";
  if (node.isEnd) return "bg-red-400";
  if (node.isInShortestPath) return "bg-blue-400 border-blue-400";
  if (node.isInTraversalPath) return "bg-yellow-400";
  if (node.isWall) return "bg-gray-600 border-gray-600";
  return "bg-white";
};
