// @ts-nocheck

"use client";
import { COLOR } from "@/src/types";
import { randomNumber, uniqueId } from "@/src/utils";
import React, { useRef, useEffect, useState } from "react";
import { Network } from "vis-network/standalone/esm/vis-network";
import "vis-network/styles/vis-network.css";
import { Dijkstra } from "./dijktras";

interface NodeI {
  id: string;
  label: string;
}

export interface GraphI {
  distance: number;
  node: NodeI;
}

let source = null;
let destination = null;
const graph = new Map<string, GraphI[]>();

const Graph = () => {
  const graphRef = useRef(null);
  const [network, setNetwork] = useState(null);

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
      { id: "1", from: "1", to: "2", label: "3", color: COLOR.EDGE },
      { id: "2", from: "1", to: "3", label: "10", color: COLOR.EDGE },
      { id: "3", from: "3", to: "1", label: "100", color: COLOR.EDGE },
      { id: "4", from: "2", to: "4", label: "90", color: COLOR.EDGE },
      { id: "5", from: "2", to: "5", label: "30", color: COLOR.EDGE },
      { id: "6", from: "3", to: "6", label: "50", color: COLOR.EDGE },
      { id: "7", from: "3", to: "7", label: "60", color: COLOR.EDGE },
    ],
  };

  console.log(graphData);

  const findNodeById = (id: string) =>
    graphData.nodes.find((node) => node.id === id);

  // const findEdgeByNodeIds = (from: string, to: string) =>
  //   graphData.edges.find((edge) => edge.from === from && edge.to === to);

  const updateNodeColorById = (id: string, color: COLOR) => {
    const node = graphData.nodes.find((node) => node.id === id);
    if (node) node.color = color;
  };

  const updateEdgeColorById = (from: string, to: string, color: COLOR) => {
    const edge = graphData.edges.find((e) => e.from === from && e.to === to);
    if (edge) edge.color = color;
  };

  const animate = (traversal, shortestPath) => {
    for (let i = 1; i < traversal.length; i++) {
      const u = traversal[i - 1];
      const v = traversal[i];
      setTimeout(() => {
        updateNodeColorById(u, COLOR.SOURCE);
        updateNodeColorById(v, COLOR.SOURCE);
        updateEdgeColorById(u, v, COLOR.SOURCE);
        network.setData(graphData);
      }, 1000 * i);
    }

    for (let i = 1; i < shortestPath.length; i++) {
      const u = shortestPath[i - 1];
      const v = shortestPath[i];
      setTimeout(() => {
        updateNodeColorById(u, COLOR.TRAVERSAL_PATH);
        updateNodeColorById(v, COLOR.TRAVERSAL_PATH);
        updateEdgeColorById(u, v, COLOR.TRAVERSAL_PATH);
        network.setData(graphData);
      }, 2000 * (i + traversal.length));
    }
    // graphData.nodes.forEach((node, i) => {
    //   setTimeout(() => {
    //     node.color = "yellow";
    //     network.setData(graphData);
    //   }, 1000 * i);
    // });
  };

  const addNode = (nodeData, callback) => {
    nodeData.label = randomNumber();
    nodeData.id = uniqueId();
    console.log("node added");
    callback(nodeData);
    delete nodeData.x;
    delete nodeData.y;
    graphData.nodes.push(nodeData);
    graph.set(nodeData.id, []);
  };

  const addEdge = (edgeData, callback) => {
    edgeData.label = randomNumber();
    edgeData.id = uniqueId();

    if (edgeData.from === edgeData.to) return;
    else callback(edgeData);

    console.log("edge is added");
    graphData.edges.push(edgeData);
    const v = findNodeById(edgeData.to);
    graph.get(edgeData.from)?.push({ node: v, distance: +edgeData.label });
  };

  const deleteNode = (ids, callback) => {
    const { nodes, edges } = ids;
    if (nodes[0] === source) source = null;
    else if (nodes[0] === destination) destination = null;
    console.log({ nodes, edges });
    callback(ids);
    graphData.nodes = graphData.nodes.filter(
      (node) => !nodes.includes(node.id)
    );

    graphData.edges = graphData.edges.filter(
      (edge) => !edges.includes(edge.id)
    );

    console.log(graphData);
  };

  const deleteEdge = (ids, callback) => {
    const { nodes, edges } = ids;
    console.log({ nodes, edges });
    callback(ids);

    graphData.edges = graphData.edges.filter(
      (edge) => !edges.includes(edge.id)
    );
  };

  useEffect(() => {
    graphData.nodes.forEach((node) => graph.set(node.id, []));

    graphData.edges.forEach((edge) => {
      const u = findNodeById(edge.from);
      const v = findNodeById(edge.to);
      const list = graph.get(u?.id);
      list.push({ node: v, distance: +edge?.label });
    });
  }, []);

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
        color: {
          inherit: false,
        },
      },
    };
    const networkInstance = new Network(container, graphData, options);

    // Add event listeners to nodes and edges
    networkInstance.on("doubleClick", (event) => {
      if (event.nodes.length === 1) {
        const nodeId = event.nodes[0];
        console.log(`Node ${nodeId} clicked`, event.nodes[0]);
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

  const runAlgo = () => {
    const { traversal, shortestPath } = Dijkstra(graph, source, destination);
    // console.log({ traversal, shortestPath });
    animate(traversal, shortestPath);
  };

  return (
    <main>
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
      <button onClick={runAlgo}>run</button>
    </main>
  );
};

export default Graph;
