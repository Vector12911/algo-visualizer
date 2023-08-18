//@ts-nocheck
import React from "react";

const Header = ({ runAlgorithm }) => {
  return (
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
      </div>
      <button
        onClick={runAlgorithm}
        className="bg-red-400 px-4 py-2 text-white"
      >
        Visualize
      </button>
    </div>
  );
};

export default Header;
