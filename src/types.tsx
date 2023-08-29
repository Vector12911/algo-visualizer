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
  SLOW = 20,
  NORMAL = 15,
  FAST = 5,
}

export enum COLOR {
  SOURCE = "#34d399",
  DESTINATION = "#f87171",
  WALL = "#4b5563",
  TRAVERSAL_PATH = "#facc15",
  SHORTEST_PATH = "#60a5fa",
  EDGE = "#60a5fa",
}

export enum ALGORITHM {
  ASTAR = "A*",
  BFS = "BFS",
  DFS = "DFS",
  DJK = "Dijkstra",
}

export enum GRAPH_TYPE {
  GRID = "GRID",
  NETWORK = "NETWORK",
}

export interface PointI {
  x: number;
  y: number;
}
