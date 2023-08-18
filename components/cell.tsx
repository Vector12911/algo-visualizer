//@ts-nocheck
"use client";

import { Point } from "@/types";
import { useState } from "react";

const status = (node: any) => {
  if (node.isStart) return "bg-green-400";
  if (node.isEnd) return "bg-red-400";
  if (node.isVisited) return "bg-blue-800";
  if (node.isWall) return "bg-gray-800";
  return "bg-white";
};
const Cell = ({ cellData, cellClickHandler, cellMouseEnterHandler }) => {
  const [node, setNode] = useState(cellData);

  return (
    <button
      onClick={() => cellClickHandler(node)}
      onMouseEnter={() => cellMouseEnterHandler(node)}
      key={`${node.x}-${node.y}`}
      className={`p-2 border w-5 h-5 ${status(node)}`}
    />
  );
};

export default Cell;
