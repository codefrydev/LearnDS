import type { TopicContent } from "@/lib/topic-content"

export const content: TopicContent = {
  slug: "queues",
  theory:
    "A queue is a First-In-First-Out (FIFO) data structure where elements are added at the rear and removed from the front. Like a line at a store, the first person in line is the first to be served. Queues are essential for scheduling tasks, managing requests in servers, and breadth-first graph traversals. Variants include priority queues, deques, and circular queues.",
  useCases: [
    "Task scheduling and process management",
    "Breadth-first search (BFS) traversals",
    "Print job and request buffering",
    "Message queues in distributed systems",
  ],
  complexity: [
    { operation: "Access", average: "O(n)", worst: "O(n)" },
    { operation: "Search", average: "O(n)", worst: "O(n)" },
    { operation: "Enqueue", average: "O(1)", worst: "O(1)" },
    { operation: "Dequeue", average: "O(1)", worst: "O(1)" },
  ],
  spaceComplexity: "O(n)",
  codeExamples: [
    {
      language: "javascript",
      label: "JavaScript",
      code: `// Queue using array (shift for dequeue)
const queue = [];

// Enqueue — O(1)
queue.push("A");
queue.push("B");
queue.push("C");

// Front — O(1)
console.log(queue[0]);  // A

// Dequeue — O(1)
console.log(queue.shift());  // A

// Size
console.log(queue.length);  // 2`,
    },
    {
      language: "csharp",
      label: "C#",
      code: `using System.Collections.Generic;

var queue = new Queue<string>();

// Enqueue — O(1)
queue.Enqueue("A");
queue.Enqueue("B");
queue.Enqueue("C");

// Peek (front) — O(1)
Console.WriteLine(queue.Peek());  // A

// Dequeue — O(1)
Console.WriteLine(queue.Dequeue());  // A

Console.WriteLine(queue.Count);  // 2`,
    },
    {
      language: "python",
      label: "Python",
      code: `from collections import deque

class Queue:
  def __init__(self):
      self.items = deque()

  def enqueue(self, item):
      self.items.append(item)

  def dequeue(self):
      if self.is_empty():
          raise IndexError("Queue is empty")
      return self.items.popleft()

  def front(self):
      if self.is_empty():
          raise IndexError("Queue is empty")
      return self.items[0]

  def is_empty(self):
      return len(self.items) == 0

  def size(self):
      return len(self.items)

# Usage
q = Queue()
q.enqueue("A")
q.enqueue("B")
q.enqueue("C")
print(q.front())    # A
print(q.dequeue())  # A
print(q.size())     # 2`,
    },
    {
      language: "go",
      label: "Go",
      code: `package main

import "fmt"

func main() {
  var queue []string

  // Enqueue — O(1)
  queue = append(queue, "A", "B", "C")

  // Front — O(1)
  fmt.Println(queue[0])  // A

  // Dequeue — O(1)
  front := queue[0]
  queue = queue[1:]
  fmt.Println(front)  // A

  fmt.Println(len(queue))  // 2
}`,
    },
  ],
  problems: [
    { id: "1", name: "Implement Queue using Stacks", difficulty: "Easy", url: "#" },
    { id: "2", name: "Number of Recent Calls", difficulty: "Easy", url: "#" },
    { id: "3", name: "Design Circular Queue", difficulty: "Medium", url: "#" },
    { id: "4", name: "Rotting Oranges", difficulty: "Medium", url: "#" },
    { id: "5", name: "Task Scheduler", difficulty: "Medium", url: "#" },
    { id: "6", name: "Sliding Window Maximum", difficulty: "Hard", url: "#" },
  ],
}
