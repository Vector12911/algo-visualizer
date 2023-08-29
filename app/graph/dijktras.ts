//@ts-nocheck
import { PriorityQueue } from "@/src/dataStructure/priorityQueue";
import { GraphI } from "./page";

export function Dijkstra(
  graph: Map<string, GraphI[]>,
  startNodeId: string,
  endNodeId: string
) {
  console.log("DJK...");
  console.log("graph : ", graph);
  const traversal: string[] = [];
  const shortestPath: string[] = [];
  // Use a map to store parent nodes for each visited node
  const parentMap = new Map<string, string>();
  const distances = new Map<string, number>();

  for (let key of graph.keys()) {
    distances.set(key, Infinity);
  }

  distances.set(startNodeId, 0);
  // traversal.push(startNodeId);
  const pq = new PriorityQueue();

  parentMap.set(startNodeId, "");
  pq.push({ nodeId: startNodeId, priority: 0 });

  let reached = false;

  while (!pq.isEmpty() && !reached) {
    const { nodeId, priority: currentDistance } = pq.pop();

    console.log(nodeId);

    const neighbors = graph.get(nodeId);
    console.log({ neighbors });
    for (let child of neighbors) {
      const edgeDistance = child.distance;

      if (child.node.id === endNodeId) {
        traversal.push(endNodeId);
        parentMap.set(endNodeId, nodeId);
        let currentNode = endNodeId;
        while (true) {
          shortestPath.push(currentNode);
          currentNode = parentMap.get(currentNode) || "";
          if (!currentNode) break;
        }
        shortestPath.reverse();
        reached = true;
        break;
      }

      const distanceThroughCurrent = currentDistance + edgeDistance;

      const childNodeDistance = distances.get(child.node.id);

      if (distanceThroughCurrent < childNodeDistance) {
        distances.set(child.node.id, distanceThroughCurrent);

        pq.push({
          nodeId: child.node.id,
          priority: distanceThroughCurrent,
        });

        traversal.push(child.node.id);
        parentMap.set(child.node.id, nodeId);
      }
    }
  }
  return { traversal, shortestPath };
}
