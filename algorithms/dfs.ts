//@ts-nocheck

const rowDirs = [-1, 0, 1, 0];
const colDirs = [0, 1, 0, -1];
let traversal: PointI[] = [];
let shortestPath: PointI[] = [];
let reached = false;

function DfsTraversal(matrix, startX, startY, endX, endY, visited, parentMap) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  if (reached) return;

  for (let dir = 0; dir < 4; dir++) {
    const newRow = startX + rowDirs[dir];
    const newCol = startY + colDirs[dir];

    if (newRow === endX && newCol === endY) {
      parentMap.set(`${endX}-${endY}`, { x: startX, y: startY });
      let currentNode = { x: endX, y: endY };

      while (true) {
        const { x, y } = currentNode;
        shortestPath.push({ x, y });
        currentNode = parentMap.get(`${currentNode.x}-${currentNode.y}`);
        if (!currentNode) break;
      }
      reached = true;
      return;
    }

    if (
      newRow >= 0 &&
      newRow < numRows &&
      newCol >= 0 &&
      newCol < numCols &&
      !matrix[newRow][newCol].isWall &&
      !visited[newRow][newCol]
    ) {
      traversal.push({ x: newRow, y: newCol });
      parentMap.set(`${newRow}-${newCol}`, { x: startX, y: startY });
      visited[newRow][newCol] = true;
      DfsTraversal(matrix, newRow, newCol, endX, endY, visited, parentMap);
    }
  }
}
export function DFS(matrix, startNode, endNode) {
  console.log("DFS...");
  traversal = [];
  shortestPath = [];
  reached = false;
  // Use a map to store parent nodes for each visited node
  const parentMap = new Map();

  const startRow = startNode.x;
  const startCol = startNode.y;
  const endRow = endNode.x;
  const endCol = endNode.y;

  const numRows = matrix.length;
  const numCols = matrix[0].length;
  const visited = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false)
  );

  parentMap.set(`${startRow}-${startCol}`, null);
  visited[startRow][startCol] = true;
  DfsTraversal(matrix, startRow, startCol, endRow, endCol, visited, parentMap);
  shortestPath.reverse();

  return { traversal, shortestPath };
}
