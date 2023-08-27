// @ts-nocheck
"use client";
import { COLOR } from "@/src/types";
import React, { useRef, useEffect, useState } from "react";
import { Network } from "vis-network/standalone/esm/vis-network";
import "vis-network/styles/vis-network.css"; // Import Vis.js styles

let source = null;
let destination = null;
const Graph = () => {
  const graphRef = useRef(null);
  const [network, setNetwork] = useState(null);
  // const [source, setSource] = useState(null);
  // const [destination, setDestination] = useState(null);

  const graphData = {
    nodes: [
      { id: "1", label: "1" },
      { id: "2", label: "2" },
      { id: "3", label: "3" },
      { id: "4", label: "4" },
      { id: "5", label: "5" },
      { id: "6", label: "6" },
      { id: "7", label: "7" },
    ],
    edges: [
      { id: "1", from: 1, to: 2, label: "3" },
      { id: "2", from: 1, to: 3, label: "10" },
      { id: "3", from: 3, to: 1 },
      { id: "4", from: 2, to: 4 },
      { id: "5", from: 2, to: 5 },
      { id: "6", from: 3, to: 6 },
      { id: "7", from: 3, to: 7 },
    ],
  };

  console.log(graphData);

  const findNodeById = (id: string) =>
    graphData.nodes.find((node) => node.id === id);
  const findEdgeById = (id: string) =>
    graphData.edges.find((node) => node.id === id);

  const updateNodeColorById = (id: string, color: COLOR) => {
    const node = graphData.nodes.find((node) => node.id === id);
    if (node) node.color = color;
  };

  const updateEdgeColorById = (id: string, color: COLOR) => {
    const edge = graphData.edges.find((edge) => edge.id === id);
    if (edge) edge.color = color;
  };

  const animate = () => {
    graphData.nodes.forEach((node, i) => {
      setTimeout(() => {
        node.color = "yellow";
        network.setData(graphData);
      }, 1000 * i);
    });
  };

  const addNode = (nodeData, callback) => {
    nodeData.label = "8";
    // nodeData.id = "8";
    console.log("node added");
    callback(nodeData);
    delete nodeData.x;
    delete nodeData.y;
    graphData.nodes.push(nodeData);
  };

  const addEdge = (edgeData, callback) => {
    console.log("edge is added");
    edgeData.label = "100";
    if (edgeData.from === edgeData.to) {
      var r = confirm("Do you want to connect the node to itself?");
      if (r === true) {
        callback(edgeData);
      }
    } else {
      callback(edgeData);
    }
    console.log(edgeData);
  };

  const deleteNode = (ids, callback) => {
    const { nodes, edges } = ids;
    if (nodes[0] === source) source = null;
    else if (nodes[0] === destination) destination = null;
    console.log({ nodes, edges });
    callback(ids);
  };

  const deleteEdge = (ids, callback) => {
    const { nodes, edges } = ids;
    console.log({ nodes, edges });
    callback(ids);
  };

  useEffect(() => {
    const container = graphRef?.current;
    const options = {
      manipulation: {
        enabled: false,
        addNode,
        addEdge,
        deleteNode,
        deleteEdge,
      },
      edges: {
        arrows: {
          to: { enabled: true, scaleFactor: 1, type: "arrow" },
        },
      },
    };
    const networkInstance = new Network(container, graphData, options);

    // Add event listeners to nodes and edges
    networkInstance.on("doubleClick", (event) => {
      if (event.nodes.length === 1) {
        const nodeId = event.nodes[0];
        console.log(`Node ${nodeId} clicked`, event.nodes[0]);
        console.log(source);
        if (!source) {
          source = nodeId;
          updateNodeColorById(nodeId, COLOR.SOURCE);
        } else if (!destination) {
          destination = nodeId;
          updateNodeColorById(nodeId, COLOR.DESTINATION);
        }
        networkInstance.setData(graphData);
      } else if (event.edges.length === 1) {
        const edgeId = event.edges[0];
        console.log(`Edge ${edgeId} clicked`, event.edges[0]);
      }
    });

    setNetwork(networkInstance);

    return () => {
      networkInstance?.destroy();
    };
  }, []);

  return (
    <>
      <div
        ref={graphRef}
        className="border"
        style={{ width: "100%", height: "500px" }}
      />
      <button onClick={() => network?.addNodeMode()}>Add Node</button>
      <br></br>
      <button onClick={() => network?.addEdgeMode()}>Add Edge</button>
      <br></br>
      <button onClick={() => network?.deleteSelected()}>Delete</button>
      <br></br>
      <button onClick={animate}>Animate</button>
    </>
  );
};

export default Graph;
