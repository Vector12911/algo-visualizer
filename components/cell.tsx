//@ts-nocheck
"use client";

import { NodeI } from "@/types";

const status = (node: NodeI) => {
  if (node.isStart) return "bg-green-400";
  if (node.isEnd) return "bg-red-400";
  if (node.isWall) return "bg-gray-600 border-gray-600";
  if (node.isInShortestPath) return "bg-blue-400 border-blue-400";
  if (node.isInTraversalPath) return "bg-yellow-400";
  return "bg-white";
};

const Cell = ({ node, handleMouseDown, handleMouseEnter, setPressed }) => {
  return (
    <button
      onMouseEnter={() => handleMouseEnter(node)}
      onMouseDown={() => handleMouseDown(node)}
      onMouseUp={() => setPressed(false)}
      key={`${node.x}-${node.y}`}
      className={`p-2 border-[0.5px] w-[22px] h-[22px] ${
        node.hasWeight ? "bg-weight bg-no-repeat bg-cover bg-center" : ""
      } ${status(node)}`}
    />
  );
};

export default Cell;
