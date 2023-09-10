//@ts-nocheck
"use client";
import { COLS, ROWS, useStateContext } from "@/src/context/state";
import Arrow from "@/src/icons/arrow";
import { ALGORITHM, GRAPH_TYPE, MAZE_TYPE, SPEED } from "@/src/types";
import Image from "next/image";
import React from "react";

let speed = "normal";
const Navbar = () => {
  const { setGlobalState, clearPath, initializeBoard } = useStateContext();

  const updateSpeed = (value: SPEED) => {
    setGlobalState((pre) => ({
      ...pre,
      animationSpeed: value,
    }));
    speed = value === 5 ? "fast" : value === 15 ? "normal" : "slow";
  };
  // conso
  return (
    <nav className="bg-gray-800 py-4 sticky top-0">
      <div className="container mx-auto flex items-center gap-12">
        <div>
          <a href="#" className="text-white font-bold text-lg">
            Algo Visualizer
          </a>
        </div>

        <div className="relative group">
          <div className="text-white hover:text-gray-300 hover:cursor-pointer flex justify-between items-center gap-2">
            <div>Algorithms</div>
            <Arrow />
          </div>
          <div className="absolute hidden group-hover:block bg-gray-800 p-2 w-[150%] space-y-2 z-100">
            <div
              onClick={() =>
                setGlobalState((pre) => ({
                  ...pre,
                  currentAlgo: ALGORITHM.ASTAR,
                }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              A* search
            </div>
            <div
              onClick={() =>
                setGlobalState((pre) => ({
                  ...pre,
                  currentAlgo: ALGORITHM.DJK,
                }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              Dijktras
            </div>
            <div
              onClick={() =>
                setGlobalState((pre) => ({
                  ...pre,
                  currentAlgo: ALGORITHM.BFS,
                }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              BFS
            </div>
            <div
              onClick={() =>
                setGlobalState((pre) => ({
                  ...pre,
                  currentAlgo: ALGORITHM.DFS,
                }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              DFS
            </div>
          </div>
        </div>
        <div className="relative group">
          <div className="text-white hover:text-gray-300 hover:cursor-pointer flex justify-between items-center gap-2">
            <div>Maze and Patterns</div>
            <div>
              <Arrow />
            </div>
          </div>
          <div className="absolute hidden group-hover:block bg-gray-800 p-2 w-full space-y-2 z-100">
            <div
              onClick={() =>
                setGlobalState((pre) => ({
                  ...pre,
                  mazeType: MAZE_TYPE.RANDOM,
                }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              Random
            </div>
            <div
              onClick={() =>
                setGlobalState((pre) => ({
                  ...pre,
                  mazeType: MAZE_TYPE.BACKTRACK_DFS,
                }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              DFS Backtracking
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className=" text-white hover:text-gray-300 hover:cursor-pointer flex justify-between items-center gap-2">
            <div>Animation Speed</div>
            <span className="bg-red-400 px-1 w-14 text-center text-sm rounded-sm">
              {speed}
            </span>
            <Arrow />
          </div>
          <div className="absolute hidden group-hover:block bg-gray-800 p-2 w-[70%] space-y-2 z-100">
            <div
              onClick={() => updateSpeed(SPEED.SLOW)}
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              Slow
            </div>
            <div
              onClick={() => updateSpeed(SPEED.FAST)}
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              Fast
            </div>
            <div
              onClick={() => updateSpeed(SPEED.NORMAL)}
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              Normal
            </div>
          </div>
        </div>
        <div className="relative group">
          <div className="text-white hover:text-gray-300 hover:cursor-pointer flex justify-between items-center gap-2">
            <div>Graph Type</div>
            <Arrow />
          </div>
          <div className="absolute hidden group-hover:block bg-gray-800 p-2 w-[130%] space-y-2 z-100">
            <div
              onClick={() =>
                setGlobalState((pre) => ({
                  ...pre,
                  graphType: GRAPH_TYPE.GRID,
                }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              2D Matrix
            </div>
            <div
              onClick={() =>
                setGlobalState((pre) => ({
                  ...pre,
                  graphType: GRAPH_TYPE.GRAPH,
                }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              Network
            </div>
          </div>
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={() => {
            initializeBoard();
            setGlobalState((pre) => ({
              ...pre,
              mazeType: MAZE_TYPE.NONE,
            }));
          }}
        >
          <div className="text-white hover:text-gray-300">Clear Board</div>
        </div>
        <div className="hover:cursor-pointer" onClick={() => clearPath()}>
          <div className="text-white hover:text-gray-300">Clear Path</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
