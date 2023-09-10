//@ts-nocheck
"use client";

import { ALGORITHM, GRAPH_TYPE, MAZE_TYPE, NodeI, SPEED } from "@/src/types";
import { createContext, useContext, useEffect, useState } from "react";

export const ROWS = 24;
export const COLS = 55;

const createNode = (i, j): NodeI => {
  return {
    x: i,
    y: j,
    weight: 1,
    hasWeight: false,
    isStart: false,
    isEnd: false,
    isVisited: false,
    isWall: false,
    isInTraversalPath: false,
    isInShortestPath: false,
  };
};

const StateContext = createContext({});

export const StateContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    graphType: GRAPH_TYPE.GRID,
    currentAlgo: ALGORITHM.BFS,
    animationSpeed: SPEED.NORMAL,
    mazeType: MAZE_TYPE.NONE,
  });

  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [matrix, setMatrix] = useState<NodeI[][]>([]);

  useEffect(() => initializeBoard(), []);

  const initializeBoard = () => {
    const mat = [];
    for (let i = 0; i < ROWS; i++) {
      const row = [];
      for (let j = 0; j < COLS; j++) {
        row.push(createNode(i, j));
      }
      mat.push(row);
    }
    setMatrix(mat);
    setSource(null);
    setDestination(null);
  };

  const clearPath = () => {
    const newMatrix = [];
    for (let i = 0; i < ROWS; i++) {
      const row = [];
      for (let j = 0; j < COLS; j++) {
        matrix[i][j].isInShortestPath = false;
        matrix[i][j].isInTraversalPath = false;
        matrix[i][j].isStart = false;
        matrix[i][j].isEnd = false;
        row.push(matrix[i][j]);
      }
      newMatrix.push(row);
    }
    setDestination(null);
    setSource(null);
    setMatrix(newMatrix);
  };

  const state = {
    source,
    setSource,
    destination,
    setDestination,
    matrix,
    initializeBoard,
    clearPath,
    globalState,
    setGlobalState,
  };

  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
