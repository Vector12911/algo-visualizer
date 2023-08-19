//@ts-nocheck
"use client";

import { BFS } from "@/algorithms/bfs";
import { Dijktras } from "@/algorithms/dijktras";
import Cell from "@/components/cell";
import Header from "@/components/header";
import { ALGORITHM, Point } from "@/types";
import { useEffect, useState } from "react";
import { useStateContext } from "../context/state";

export default function PathFinder() {
  const [pressed, setPressed] = useState(false);
  const [_, setfakeState] = useState(null);
  const [isWKeyIsPressed, setWKeyIsPressed] = useState(false);

  const {
    globalState,
    matrix,
    source,
    setSource,
    destination,
    setDestination,
  } = useStateContext();

  const { currentAlgo, animationSpeed } = globalState;

  useEffect(() => removeWeights(), [currentAlgo]);

  const removeWeights = () => {
    if (!source || !destination) return;
    if (currentAlgo === ALGORITHM.ASTART || currentAlgo === ALGORITHM.DJK) {
      return;
    }

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j].hasWeight) {
          matrix[i][j].hasWeight = false;
          matrix[i][j].weight = 1;
        }
      }
    }
    setfakeState("removed weights");
  };

  const runAlgorithm = () => {
    if (!source || !destination) return;
    let res = null;
    if (currentAlgo === ALGORITHM.BFS) res = BFS(matrix, source, destination);
    else if (currentAlgo === ALGORITHM.DJK)
      res = Dijktras(matrix, source, destination);
    const { traversal, shortestPath } = res;
    animateAlgorithm(traversal, shortestPath);
  };

  const animateAlgorithm = (traversal, shortestPath) => {
    for (let i = 0; i < traversal.length; i++) {
      const { x, y } = traversal[i];
      matrix[x][y].isInTraversalPath = false;
    }

    for (let i = 0; i < shortestPath.length; i++) {
      const { x, y } = shortestPath[i];
      matrix[x][y].isInShortestPath = false;
    }

    for (let i = 0; i < traversal.length; i++) {
      setTimeout(() => {
        const { x, y } = traversal[i];
        matrix[x][y].isInTraversalPath = true;
        setfakeState(i);
      }, animationSpeed * i);
    }

    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const { x, y } = shortestPath[i];
        matrix[x][y].isInShortestPath = true;
        setfakeState(i);
      }, animationSpeed * (traversal.length + i));
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
      if (
        isWKeyIsPressed &&
        (currentAlgo === ALGORITHM.ASTART || currentAlgo === ALGORITHM.DJK)
      ) {
        node.hasWeight = true;
        node.weight = 50;
      } else {
        node.isWall = true;
      }
      setfakeState(`${x}-${y}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "w" || event.key === "W") {
      setWKeyIsPressed(true);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "w" || event.key === "W") {
      setWKeyIsPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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
                className={`p-2 border-[0.5px] w-[22px] h-[22px] ${status(
                  cell
                )}`}
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
  if (node.isWall) return "bg-gray-600 border-gray-600";
  if (node.hasWeight && node.isInShortestPath) {
    return "bg-weight bg-no-repeat bg-cover bg-center bg-blue-400 bg-opacity-80";
  }
  if (node.hasWeight && node.isInTraversalPath) {
    return "bg-weight bg-no-repeat bg-cover bg-center bg-yellow-400 bg-opacity-80";
  }
  if (node.hasWeight) return "bg-weight bg-no-repeat bg-cover bg-center";
  if (node.isInShortestPath) return "bg-blue-400 border-blue-400";
  if (node.isInTraversalPath) return "bg-yellow-400";
  return "bg-white";
};

//TODO:
/**
 * 1. add weights on the cell
 * 2.
 */
