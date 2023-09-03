//@ts-nocheck
"use client";
import { useEffect, useState } from "react";

import { ALGORITHM, Point } from "@/types";
import Header from "@/components/header";
import { useStateContext } from "@/context/state";
import Cell from "@/components/cell";
import { sleep } from "@/src/utils";

import { BFS, Astar, Dijkstra, DFS } from "@/algorithms";
import { randomMaze } from "@/maze/random";

export default function PathFinder() {
  const [pressed, setPressed] = useState(false);
  const [_, setfakeState] = useState(null);
  const [isWKeyPressed, setIsWKeyPressed] = useState(false);
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
    console.log({ traversal, shortestPath });
    animateAlgorithm(traversal, shortestPath);
  };

  const animateTraversal = async (index, arr, className) => {
    if (index >= arr.length) {
      return;
    }

    const { x, y } = arr[index];
    if (className === "node-visited") {
      matrix[x][y].isInTraversalPath = true;
    } else if (className === "node-shortest-path") {
      matrix[x][y].isInShortestPath = true;
    } else if (className === "wall") {
      matrix[x][y].isWall = true;
    }

    const ele = document.getElementById(`${x}-${y}`);
    ele.className = `p-2 border-[0.5px] w-[22px] h-[22px] ${className}`;

    await sleep(animationSpeed);

    animateTraversal(index + 1, arr, className);
  };

  const animateMaze = () => {
    const pairs = randomMaze();
    animateTraversal(0, pairs, "wall");
  };

  const animateAlgorithm = async (traversal, shortestPath) => {
    //clear the traversal path
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        matrix[i][j].isInTraversalPath = false;
        matrix[i][j].isInShortestPath = false;
      }
    }

    await animateTraversal(0, traversal, "node-visited");

    await sleep(animationSpeed * (traversal.length + 110));

    await animateTraversal(0, shortestPath, "node-shortest-path");

    await sleep(animationSpeed * shortestPath.length);

    setIsAlgoRunning(false);
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
        isWKeyPressed &&
        !node.isStart &&
        !node.isEnd &&
        !node.isWall &&
        (currentAlgo === ALGORITHM.ASTAR || currentAlgo === ALGORITHM.DJK)
      ) {
        node.hasWeight = true;
        node.weight = 20;
      } else {
        node.isWall = true;
      }
      setfakeState(`${x}-${y}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "w" || event.key === "W") {
      setIsWKeyPressed(true);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "w" || event.key === "W") {
      setIsWKeyPressed(false);
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
      <button onClick={animateMaze}>maze</button>
    </main>
  );
}
