//@ts-nocheck
import { useStateContext } from "@/context/state";
import { ALGORITHM } from "@/types";
import React from "react";

const Header = ({ runAlgorithm }) => {
  const { globalState } = useStateContext();

  const { currentAlgo } = globalState;
  let isWeighted = false;

  function getAlgorithmDescription() {
    switch (currentAlgo) {
      case ALGORITHM.DFS:
        isWeighted = false;
        return [
          "Depth-First Search (DFS) is an unweighted graph traversal algorithm exploring as far as possible along each branch before backtracking.",
          "does not guarantees the shortest path!",
        ];
      case ALGORITHM.BFS:
        isWeighted = false;
        return [
          "Breadth-First Search (BFS) is an unweighted graph traversal algorithm visiting all nodes at the current level before moving to the next level.",
          "guarantees the shortest path!",
        ];
      case ALGORITHM.ASTART:
        isWeighted = true;
        return [
          "A* Search is a weighted graph pathfinding algorithm considering both actual cost and estimated cost to the destination.",
          "guarantees the shortest path!",
        ];
      case ALGORITHM.DJK:
        isWeighted = true;
        return [
          "Dijkstra's Algorithm is a weighted graph algorithm finding the shortest paths from a starting node to all other nodes.",
          "guarantees the shortest path!",
        ];
    }
  }

  const [description, res] = getAlgorithmDescription();

  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="flex flex-wrap gap-5 h-16">
          <div className="flex items-center gap-1">
            <div className="p-2 border w-5 h-5 bg-green-400" />
            <span>Start Node</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="p-2 border w-5 h-5 bg-red-400" />
            <span>Target Node</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="p-2 border w-5 h-5 bg-gray-600" />
            <span>Wall</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="p-2 border w-5 h-5 bg-white" />
            <span>Not Visited Node</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="p-2 border w-5 h-5 bg-yellow-400" />
            <span>Visited Node</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="p-2 border w-5 h-5 bg-blue-400" />
            <span>Shortest Path Node</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="p-2 border w-5 h-5 bg-weight bg-no-repeat bg-cover bg-center" />
            <span className={`${!isWeighted ? "line-through" : ""}`}>
              Weight Node
            </span>
          </div>
        </div>
        <button
          onClick={runAlgorithm}
          className="bg-red-400 px-4 py-2 text-white"
        >
          Visualize
        </button>
      </div>
      <div className="h-14 mb-4 flex flex-col items-center">
        <div>{description}</div>
        <div>{res}</div>
      </div>
    </div>
  );
};

export default Header;
