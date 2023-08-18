//@ts-nocheck

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ROWS = 30;
const COLS = 60;

const createNode = (i, j) => {
  return {
    x: i,
    y: j,
    weight: 1,
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
    graphType: "grid",
    currentAlgo: "bfs",
    animationSpeed: "normal",
  });

  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [matrix, setMatrix] = useState([]);

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

  const state = {
    source,
    setSource,
    destination,
    setDestination,
    matrix,
    initializeBoard,
    globalState,
    setGlobalState,
  };

  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
