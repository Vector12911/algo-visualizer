//@ts-nocheck
"use client";
import React, { useRef, useEffect } from "react";
import { Network } from "vis-network/standalone/esm/vis-network";
import "vis-network/styles/vis-network.css"; // Import Vis.js styles

const Graph = () => {
  const graphRef = useRef(null);
  const graphData = {
    nodes: [
      { id: 1, label: "1" },
      { id: 2, label: "2" },
      { id: 3, label: "3" },
      { id: 4, label: "4" },
      { id: 5, label: "5" },
      { id: 6, label: "6" },
      { id: 7, label: "7" },
    ],
    edges: [
      { id: "e-1", from: 1, to: 2, label: "3" },
      { from: 1, to: 3 },
      { from: 3, to: 1 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
      { from: 3, to: 7 },
    ],
  };

  useEffect(() => {
    // Initialize Vis.js network using the graph data
    const container = graphRef?.current;
    const options = {
      edges: {
        arrows: {
          to: { enabled: true, scaleFactor: 1, type: "arrow" },
        },
      },
    };
    const network = new Network(container, graphData, options);

    // Add event listeners to nodes and edges
    network.on("click", (event) => {
      if (event.nodes.length === 1) {
        // Node was clicked
        const nodeId = event.nodes[0];
        console.log(`Node ${nodeId} clicked`, event.nodes[0]);
      } else if (event.edges.length === 1) {
        // Edge was clicked
        const edgeId = event.edges[0];
        console.log(`Edge ${edgeId} clicked`, event.edges[0]);
      }
    });

    network.on("doubleClick", (event) => {
      if (event.nodes.length === 1) {
        // Node was double-clicked
        const nodeId = event.nodes[0];
        console.log(`Node ${nodeId} double-clicked`);
      }
    });

    network.on("hoverNode", (event) => {
      if (event.node !== undefined) {
        // Node is being hovered over
        const nodeId = event.node;
        console.log(`Node ${nodeId} hovered`);
      }
    });

    network.on("blurNode", () => {
      // Node is no longer hovered over
      console.log("Node blur");
    });

    network.on("hoverEdge", (event) => {
      if (event.edge !== undefined) {
        // Edge is being hovered over
        const edgeId = event.edge;
        console.log(`Edge ${edgeId} hovered`);
      }
    });

    network.on("blurEdge", () => {
      // Edge is no longer hovered over
      console.log("Edge blur");
    });
    // Clean up the network on component unmount
    return () => {
      network?.destroy();
    };
  }, []);

  return <div ref={graphRef} style={{ width: "100%", height: "400px" }} />;
};

export default Graph;
