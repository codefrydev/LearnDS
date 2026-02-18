import type { TopicContent } from "@/lib/topic-content"

export const content: TopicContent = {
  slug: "graphs",
  theory:
    "A graph consists of a set of vertices (nodes) connected by edges. Graphs can be directed or undirected, weighted or unweighted, and cyclic or acyclic. They model complex relationships like social networks, road maps, and dependency systems. Key traversal algorithms include Depth-First Search (DFS) and Breadth-First Search (BFS), while pathfinding uses Dijkstra's and Bellman-Ford algorithms.",
  useCases: [
    "Social network connections",
    "Map routing and GPS navigation",
    "Dependency resolution in build systems",
    "Network topology and circuit analysis",
  ],
  complexity: [
    { operation: "Add Vertex", average: "O(1)", worst: "O(1)" },
    { operation: "Add Edge", average: "O(1)", worst: "O(1)" },
    { operation: "BFS / DFS", average: "O(V + E)", worst: "O(V + E)" },
    { operation: "Remove Vertex", average: "O(V + E)", worst: "O(V + E)" },
  ],
  spaceComplexity: "O(V + E)",
  codeExamples: [
    {
      language: "javascript",
      label: "JavaScript",
      code: `class Graph {
  constructor() {
  this.adj = new Map();
  }

  addEdge(u, v) {
  if (!this.adj.has(u)) this.adj.set(u, []);
  if (!this.adj.has(v)) this.adj.set(v, []);
  this.adj.get(u).push(v);
  this.adj.get(v).push(u);
  }

  bfs(start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const nb of this.adj.get(node) ?? []) {
      if (!visited.has(nb)) {
        visited.add(nb);
        queue.push(nb);
      }
    }
  }
  return order;
  }
}

const g = new Graph();
g.addEdge(0, 1); g.addEdge(0, 2);
g.addEdge(1, 3); g.addEdge(2, 4);
console.log(g.bfs(0));  // [0, 1, 2, 3, 4]`,
    },
    {
      language: "csharp",
      label: "C#",
      code: `using System.Collections.Generic;

var adj = new Dictionary<int, List<int>>();

void AddEdge(int u, int v) {
  if (!adj.ContainsKey(u)) adj[u] = new List<int>();
  if (!adj.ContainsKey(v)) adj[v] = new List<int>();
  adj[u].Add(v);
  adj[v].Add(u);
}

List<int> Bfs(int start) {
  var visited = new HashSet<int> { start };
  var queue = new Queue<int>();
  queue.Enqueue(start);
  var order = new List<int>();
  while (queue.Count > 0) {
  int node = queue.Dequeue();
  order.Add(node);
  foreach (int nb in adj.GetValueOrDefault(node, new List<int>())) {
    if (!visited.Contains(nb)) {
      visited.Add(nb);
      queue.Enqueue(nb);
    }
  }
  }
  return order;
}

AddEdge(0, 1); AddEdge(0, 2);
AddEdge(1, 3); AddEdge(2, 4);
// Bfs(0) => [0, 1, 2, 3, 4]`,
    },
    {
      language: "python",
      label: "Python",
      code: `from collections import defaultdict, deque

class Graph:
  def __init__(self):
      self.adj = defaultdict(list)

  def add_edge(self, u, v):
      self.adj[u].append(v)
      self.adj[v].append(u)  # undirected

  def bfs(self, start):
      visited = set([start])
      queue = deque([start])
      order = []
      while queue:
          node = queue.popleft()
          order.append(node)
          for neighbor in self.adj[node]:
              if neighbor not in visited:
                  visited.add(neighbor)
                  queue.append(neighbor)
      return order

  def dfs(self, start, visited=None):
      if visited is None:
          visited = set()
      visited.add(start)
      print(start, end=" ")
      for neighbor in self.adj[start]:
          if neighbor not in visited:
              self.dfs(neighbor, visited)

g = Graph()
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 3)
g.add_edge(2, 4)
print(g.bfs(0))  # [0, 1, 2, 3, 4]`,
    },
    {
      language: "go",
      label: "Go",
      code: `package main

import "fmt"

func bfs(adj map[int][]int, start int) []int {
  visited := map[int]bool{start: true}
  queue := []int{start}
  var order []int
  for len(queue) > 0 {
      node := queue[0]
      queue = queue[1:]
      order = append(order, node)
      for _, nb := range adj[node] {
          if !visited[nb] {
              visited[nb] = true
              queue = append(queue, nb)
          }
      }
  }
  return order
}

func main() {
  adj := make(map[int][]int)
  adj[0] = []int{1, 2}
  adj[1] = []int{0, 3}
  adj[2] = []int{0, 4}
  adj[3] = []int{1}
  adj[4] = []int{2}
  fmt.Println(bfs(adj, 0))  // [0 1 2 3 4]
}`,
    },
  ],
  problems: [
    { id: "1", name: "Number of Islands", difficulty: "Medium", url: "#" },
    { id: "2", name: "Clone Graph", difficulty: "Medium", url: "#" },
    { id: "3", name: "Course Schedule", difficulty: "Medium", url: "#" },
    { id: "4", name: "Pacific Atlantic Water Flow", difficulty: "Medium", url: "#" },
    { id: "5", name: "Graph Valid Tree", difficulty: "Medium", url: "#" },
    { id: "6", name: "Word Ladder", difficulty: "Hard", url: "#" },
    { id: "7", name: "Alien Dictionary", difficulty: "Hard", url: "#" },
  ],
}
