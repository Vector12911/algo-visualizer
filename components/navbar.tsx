//@ts-nocheck
"use client";
import { useStateContext } from "@/context/state";
import Arrow from "@/icons/arrow";
import React from "react";

const Navbar = () => {
  const { setGlobalState, initializeBoard } = useStateContext();

  return (
    <nav className="bg-gray-800 py-4">
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
          <div className="absolute hidden group-hover:block bg-gray-800 p-2 w-[150%] space-y-2">
            <div
              onClick={() =>
                setGlobalState((pre) => ({ ...pre, currentAlgo: "astar" }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              A* search
            </div>
            <div
              onClick={() =>
                setGlobalState((pre) => ({ ...pre, currentAlgo: "djk" }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              Dijktras
            </div>
            <div
              onClick={() =>
                setGlobalState((pre) => ({ ...pre, currentAlgo: "bfs" }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              BFS
            </div>
            <div
              onClick={() =>
                setGlobalState((pre) => ({ ...pre, currentAlgo: "dfs" }))
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
          <div className="absolute hidden group-hover:block bg-gray-800 p-2 w-full space-y-2">
            <div className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1">
              A* search
            </div>
            <div className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1">
              Dijktras
            </div>
            <div className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1">
              BFS
            </div>
            <div className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1">
              DFS
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="text-white hover:text-gray-300 hover:cursor-pointer flex justify-between items-center gap-2">
            <div>Animation Speed</div>
            <Arrow />
          </div>
          <div className="absolute hidden group-hover:block bg-gray-800 p-2 w-full space-y-2">
            <div
              onClick={() =>
                setGlobalState((pre) => ({ ...pre, animationSpeed: "slow" }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              Slow
            </div>
            <div
              onClick={() =>
                setGlobalState((pre) => ({ ...pre, animationSpeed: "fast" }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              Fast
            </div>
            <div
              onClick={() =>
                setGlobalState((pre) => ({ ...pre, animationSpeed: "normal" }))
              }
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
          <div className="absolute hidden group-hover:block bg-gray-800 p-2 w-[130%] space-y-2">
            <div
              onClick={() =>
                setGlobalState((pre) => ({ ...pre, graphType: "grid" }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              2D Matrix
            </div>
            <div
              onClick={() =>
                setGlobalState((pre) => ({ ...pre, graphType: "graph" }))
              }
              className="w-full hover:bg-red-400 hover:text-white text-gray-300 hover:cursor-pointer px-2 py-1"
            >
              Linked List
            </div>
          </div>
        </div>
        <div className="hover:cursor-pointer" onClick={() => initializeBoard()}>
          <div className="text-white hover:text-gray-300">Clear Board</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
