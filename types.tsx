export interface Point {
  x: number;
  y: number;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
}
export interface NodeI {
  x: number;
  y: number;
  weight: number;
  hasWeight: boolean;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isWall: boolean;
  isInTraversalPath: boolean;
  isInShortestPath: boolean;
}

export enum SPEED {
  SLOW = 30,
  NORMAL = 20,
  FAST = 10,
}

export enum ALGORITHM {
  ASTAR = "A*",
  BFS = "BFS",
  DFS = "DFS",
  DJK = "Dijkstra",
}

export enum GRAPH_TYPE {
  GRID = "grid",
  GRAPH = "graph",
}

export interface PointI {
  x: number;
  y: number;
}
