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
  SLOW = 40,
  NORMAL = 30,
  FAST = 20,
}

export enum ALGORITHM {
  ASTART = "astar",
  BFS = "bfs",
  DFS = "dfs",
  DJK = "djk",
}

export enum GRAPH_TYPE {
  GRID = "grid",
  GRAPH = "graph",
}

export interface PointI {
  x: number;
  y: number;
}
