//@ts-nocheck
"use client";

import { BFS } from "@/algorithms/bfs";
import { Dijkstra } from "@/algorithms/dijktras";
import Header from "@/components/header";
import { ALGORITHM, Point } from "@/types";
import { useEffect, useState } from "react";
import { useStateContext } from "@/context/state";
import { Astar } from "@/algorithms/astar";
import { DFS } from "@/algorithms/dfs";
import Cell from "@/components/cell";

export default function PathFinder() {
  const [pressed, setPressed] = useState(false);
  const [_, setfakeState] = useState(null);
  const [isWKeyIsPressed, setWKeyIsPressed] = useState(false);
  const [isAlgoRunning, setIsAlgoRunning] = useState(false);

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
    if (currentAlgo === ALGORITHM.ASTAR || currentAlgo === ALGORITHM.DJK) {
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

    switch (currentAlgo) {
      case ALGORITHM.BFS:
        res = BFS(matrix, source, destination);
        break;
      case ALGORITHM.DJK:
        res = Dijkstra(matrix, source, destination);
        break;
      case ALGORITHM.ASTAR:
        res = Astar(matrix, source, destination);
        break;
      case ALGORITHM.DFS:
        res = DFS(matrix, source, destination);
        break;
      default:
        console.log("No algorithm selected");
        break;
    }
    setIsAlgoRunning(true);
    const { traversal, shortestPath } = res;
    animateAlgorithm(traversal, shortestPath);
  };

  const animateAlgorithm = (traversal, shortestPath) => {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        matrix[i][j].isInTraversalPath = false;
        matrix[i][j].isInShortestPath = false;
      }
    }

    for (let i = 0; i < traversal.length; i++) {
      const { x, y } = traversal[i];
      setTimeout(() => {
        matrix[x][y].isInTraversalPath = true;
        setfakeState(i);
      }, animationSpeed * i);
    }

    for (let i = 0; i < shortestPath.length; i++) {
      const { x, y } = shortestPath[i];
      setTimeout(() => {
        matrix[x][y].isInShortestPath = true;
        setfakeState(i);
      }, animationSpeed * (traversal.length + i));
    }

    setTimeout(
      () => setIsAlgoRunning(false),
      animationSpeed * (traversal.length + shortestPath.length)
    );
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
        !node.isStart &&
        !node.isEnd &&
        !node.isWall &&
        (currentAlgo === ALGORITHM.ASTAR || currentAlgo === ALGORITHM.DJK)
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
      <Header runAlgorithm={runAlgorithm} isAlgoRunning={isAlgoRunning} />
      <div>
        {matrix.map((row, rowIndex) => (
          <div key={`${rowIndex}-${new Date().getTime()}`} className="flex">
            {row.map((cell, colIndex) => (
              <Cell
                node={cell}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
                setPressed={setPressed}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
