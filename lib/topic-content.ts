export interface ComplexityRow {
  operation: string
  average: string
  worst: string
}

export interface CodeExample {
  language: string
  label: string
  code: string
}

export interface PracticeProblem {
  id: string
  name: string
  difficulty: "Easy" | "Medium" | "Hard"
  url: string
}

export interface TopicContent {
  slug: string
  theory: string
  useCases: string[]
  complexity: ComplexityRow[]
  spaceComplexity: string
  codeExamples: CodeExample[]
  problems: PracticeProblem[]
}

const topicContentMap: Record<string, TopicContent> = {
  arrays: {
    slug: "arrays",
    theory:
      "An array is a linear data structure that stores elements in contiguous memory locations, where each element is identified by a zero-based numerical index. Because elements sit side-by-side in memory, the processor can jump directly to any position using simple pointer arithmetic, yielding O(1) random access -- the defining advantage of arrays over linked structures.\n\nArrays come in two flavors: static arrays have a fixed size determined at allocation time (C/C++ int arr[10]), while dynamic arrays (Python lists, Java ArrayList, C++ std::vector) automatically resize when capacity is exceeded by allocating a larger block and copying elements over. This resizing gives append operations an amortized O(1) cost, though a single append can occasionally take O(n) when a full copy is triggered.\n\nThe trade-off is that insertion or deletion in the middle requires shifting all subsequent elements, making those operations O(n). Arrays are best when the collection size is relatively stable and fast index-based lookups are the priority. They also exhibit excellent cache locality because sequential elements occupy adjacent cache lines, making iteration significantly faster in practice than pointer-based structures like linked lists.",
    useCases: [
      "Storing and accessing sequential data",
      "Implementing lookup tables and buffers",
      "Basis for dynamic arrays, stacks, and queues",
      "Matrix and image representation",
      "Sorting and binary search algorithms",
      "Sliding window and two-pointer techniques",
    ],
    complexity: [
      { operation: "Access", average: "O(1)", worst: "O(1)" },
      { operation: "Search", average: "O(n)", worst: "O(n)" },
      { operation: "Insertion (middle)", average: "O(n)", worst: "O(n)" },
      { operation: "Append (end)", average: "O(1)*", worst: "O(n)" },
      { operation: "Deletion", average: "O(n)", worst: "O(n)" },
    ],
    spaceComplexity: "O(n)",
    codeExamples: [
      {
        language: "javascript",
        label: "JavaScript",
        code: `// Array operations in JavaScript

// Initialize
const arr = [10, 20, 30, 40, 50];

// Access by index — O(1)
console.log(arr[2]);  // 30

// Search — O(n)
const index = arr.indexOf(40);  // 3

// Insert at position — O(n)
arr.splice(2, 0, 25);  // [10, 20, 25, 30, 40, 50]

// Append to end — Amortized O(1)
arr.push(60);

// Delete by value — O(n)
arr.splice(arr.indexOf(25), 1);

// Slice — O(k)
const sub = arr.slice(1, 4);  // [20, 30, 40]

console.log(arr);`,
      },
      {
        language: "csharp",
        label: "C#",
        code: `using System;
using System.Collections.Generic;

// Array / List operations in C#
var list = new List<int> { 10, 20, 30, 40, 50 };

// Access by index — O(1)
Console.WriteLine(list[2]);  // 30

// Search — O(n)
int idx = list.IndexOf(40);  // 3

// Insert at position — O(n)
list.Insert(2, 25);

// Append to end — Amortized O(1)
list.Add(60);

// Delete by value — O(n)
list.Remove(25);

// Slice — O(k)
var sub = list.GetRange(1, 3);

Console.WriteLine(string.Join(", ", list));`,
      },
      {
        language: "python",
        label: "Python",
        code: `# Array (List) Operations in Python

# Initialize
arr = [10, 20, 30, 40, 50]

# Access by index — O(1)
print(arr[2])          # 30

# Search — O(n)
index = arr.index(40)  # 3

# Insert at position — O(n)
arr.insert(2, 25)      # [10, 20, 25, 30, 40, 50]

# Append to end — Amortized O(1)
arr.append(60)

# Delete by value — O(n)
arr.remove(25)

# Slice — O(k)
sub = arr[1:4]         # [20, 30, 40]

print(arr)`,
      },
      {
        language: "go",
        label: "Go",
        code: `package main

import "fmt"

// Slice operations in Go
func main() {
    arr := []int{10, 20, 30, 40, 50}

    // Access by index — O(1)
    fmt.Println(arr[2])  // 30

    // Search — O(n)
    idx := -1
    for i, v := range arr {
        if v == 40 { idx = i; break }
    }

    // Insert at position — O(n)
    arr = append(arr[:2], append([]int{25}, arr[2:]...)...)

    // Append to end — Amortized O(1)
    arr = append(arr, 60)

    // Delete by value — O(n)
    for i, v := range arr {
        if v == 25 {
            arr = append(arr[:i], arr[i+1:]...)
            break
        }
    }

    fmt.Println(arr)
}`,
      },
    ],
    problems: [
      { id: "1", name: "Two Sum", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/" },
      { id: "2", name: "Best Time to Buy and Sell Stock", difficulty: "Easy", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { id: "3", name: "Contains Duplicate", difficulty: "Easy", url: "https://leetcode.com/problems/contains-duplicate/" },
      { id: "4", name: "Maximum Subarray", difficulty: "Medium", url: "https://leetcode.com/problems/maximum-subarray/" },
      { id: "5", name: "Product of Array Except Self", difficulty: "Medium", url: "https://leetcode.com/problems/product-of-array-except-self/" },
      { id: "6", name: "Merge Intervals", difficulty: "Medium", url: "https://leetcode.com/problems/merge-intervals/" },
      { id: "7", name: "3Sum", difficulty: "Medium", url: "https://leetcode.com/problems/3sum/" },
      { id: "8", name: "Container With Most Water", difficulty: "Medium", url: "https://leetcode.com/problems/container-with-most-water/" },
      { id: "9", name: "Trapping Rain Water", difficulty: "Hard", url: "https://leetcode.com/problems/trapping-rain-water/" },
      { id: "10", name: "First Missing Positive", difficulty: "Hard", url: "https://leetcode.com/problems/first-missing-positive/" },
    ],
  },
  "linked-lists": {
    slug: "linked-lists",
    theory:
      "A linked list is a linear data structure where each element (node) contains data and a reference (pointer) to the next node. Unlike arrays, linked lists do not store elements in contiguous memory, which allows efficient insertion and deletion at any point without shifting elements. Common variants include singly linked, doubly linked, and circular linked lists.",
    useCases: [
      "Dynamic memory allocation",
      "Implementing stacks, queues, and deques",
      "Undo functionality in applications",
      "Polynomial arithmetic and sparse matrices",
    ],
    complexity: [
      { operation: "Access", average: "O(n)", worst: "O(n)" },
      { operation: "Search", average: "O(n)", worst: "O(n)" },
      { operation: "Insertion", average: "O(1)", worst: "O(1)" },
      { operation: "Deletion", average: "O(1)", worst: "O(1)" },
    ],
    spaceComplexity: "O(n)",
    codeExamples: [
      {
        language: "javascript",
        label: "JavaScript",
        code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() { this.head = null; }

  append(data) {
    const node = new Node(data);
    if (!this.head) { this.head = node; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }

  prepend(data) {
    const node = new Node(data);
    node.next = this.head;
    this.head = node;
  }

  delete(data) {
    if (!this.head) return;
    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }
    let curr = this.head;
    while (curr.next && curr.next.data !== data) curr = curr.next;
    if (curr.next) curr.next = curr.next.next;
  }
}

const ll = new LinkedList();
ll.append(1); ll.append(2); ll.append(3);
ll.prepend(0);
console.log(ll);  // 0 -> 1 -> 2 -> 3`,
      },
      {
        language: "csharp",
        label: "C#",
        code: `public class Node {
  public int Data { get; set; }
  public Node Next { get; set; }
  public Node(int data) { Data = data; }
}

public class LinkedList {
  private Node head;

  public void Append(int data) {
    var node = new Node(data);
    if (head == null) { head = node; return; }
    var curr = head;
    while (curr.Next != null) curr = curr.Next;
    curr.Next = node;
  }

  public void Prepend(int data) {
    var node = new Node(data) { Next = head };
    head = node;
  }

  public void Delete(int data) {
    if (head == null) return;
    if (head.Data == data) { head = head.Next; return; }
    var curr = head;
    while (curr.Next != null && curr.Next.Data != data) curr = curr.Next;
    if (curr.Next != null) curr.Next = curr.Next.Next;
  }
}`,
      },
      {
        language: "python",
        label: "Python",
        code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = new_node

    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def delete(self, data):
        if not self.head:
            return
        if self.head.data == data:
            self.head = self.head.next
            return
        curr = self.head
        while curr.next and curr.next.data != data:
            curr = curr.next
        if curr.next:
            curr.next = curr.next.next

    def display(self):
        nodes = []
        curr = self.head
        while curr:
            nodes.append(str(curr.data))
            curr = curr.next
        print(" -> ".join(nodes))

ll = LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
ll.prepend(0)
ll.display()  # 0 -> 1 -> 2 -> 3`,
      },
      {
        language: "go",
        label: "Go",
        code: `package main

type Node struct {
    data int
    next *Node
}

type LinkedList struct {
    head *Node
}

func (l *LinkedList) Append(data int) {
    node := &Node{data: data}
    if l.head == nil { l.head = node; return }
    curr := l.head
    for curr.next != nil { curr = curr.next }
    curr.next = node
}

func (l *LinkedList) Prepend(data int) {
    node := &Node{data: data, next: l.head}
    l.head = node
}

func (l *LinkedList) Delete(data int) {
    if l.head == nil { return }
    if l.head.data == data {
        l.head = l.head.next
        return
    }
    curr := l.head
    for curr.next != nil && curr.next.data != data { curr = curr.next }
    if curr.next != nil {
        curr.next = curr.next.next
    }
}`,
      },
    ],
    problems: [
      { id: "1", name: "Reverse Linked List", difficulty: "Easy", url: "#" },
      { id: "2", name: "Merge Two Sorted Lists", difficulty: "Easy", url: "#" },
      { id: "3", name: "Linked List Cycle", difficulty: "Easy", url: "#" },
      { id: "4", name: "Remove Nth Node From End", difficulty: "Medium", url: "#" },
      { id: "5", name: "Add Two Numbers", difficulty: "Medium", url: "#" },
      { id: "6", name: "Reorder List", difficulty: "Medium", url: "#" },
      { id: "7", name: "Merge k Sorted Lists", difficulty: "Hard", url: "#" },
    ],
  },
  stacks: {
    slug: "stacks",
    theory:
      "A stack is a Last-In-First-Out (LIFO) data structure where elements are added and removed from the same end, called the top. Think of it like a stack of plates: you can only add or remove the top plate. Stacks are fundamental to function call management, expression evaluation, backtracking algorithms, and undo mechanisms in software.",
    useCases: [
      "Function call stack and recursion",
      "Expression evaluation and syntax parsing",
      "Undo/Redo operations in editors",
      "Browser back/forward navigation",
    ],
    complexity: [
      { operation: "Access", average: "O(n)", worst: "O(n)" },
      { operation: "Search", average: "O(n)", worst: "O(n)" },
      { operation: "Push", average: "O(1)", worst: "O(1)" },
      { operation: "Pop", average: "O(1)", worst: "O(1)" },
    ],
    spaceComplexity: "O(n)",
    codeExamples: [
      {
        language: "javascript",
        label: "JavaScript",
        code: `// Stack using array
const stack = [];

// Push — O(1)
stack.push(10);
stack.push(20);
stack.push(30);

// Peek — O(1)
console.log(stack[stack.length - 1]);  // 30

// Pop — O(1)
console.log(stack.pop());  // 30

// Size
console.log(stack.length);  // 2`,
      },
      {
        language: "csharp",
        label: "C#",
        code: `using System.Collections.Generic;

var stack = new Stack<int>();

// Push — O(1)
stack.Push(10);
stack.Push(20);
stack.Push(30);

// Peek — O(1)
Console.WriteLine(stack.Peek());  // 30

// Pop — O(1)
Console.WriteLine(stack.Pop());   // 30

// Count
Console.WriteLine(stack.Count);   // 2`,
      },
      {
        language: "python",
        label: "Python",
        code: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

# Usage
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)
print(stack.peek())  # 30
print(stack.pop())   # 30
print(stack.size())  # 2`,
      },
      {
        language: "go",
        label: "Go",
        code: `package main

import "fmt"

func main() {
    var stack []int

    // Push — O(1)
    stack = append(stack, 10, 20, 30)

    // Peek — O(1)
    fmt.Println(stack[len(stack)-1])  // 30

    // Pop — O(1)
    top := stack[len(stack)-1]
    stack = stack[:len(stack)-1]
    fmt.Println(top)  // 30

    fmt.Println(len(stack))  // 2
}`,
      },
    ],
    problems: [
      { id: "1", name: "Valid Parentheses", difficulty: "Easy", url: "#" },
      { id: "2", name: "Min Stack", difficulty: "Medium", url: "#" },
      { id: "3", name: "Evaluate Reverse Polish Notation", difficulty: "Medium", url: "#" },
      { id: "4", name: "Daily Temperatures", difficulty: "Medium", url: "#" },
      { id: "5", name: "Decode String", difficulty: "Medium", url: "#" },
      { id: "6", name: "Largest Rectangle in Histogram", difficulty: "Hard", url: "#" },
    ],
  },
  queues: {
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
  },
  "hash-tables": {
    slug: "hash-tables",
    theory:
      "A hash table (or hash map) stores key-value pairs using a hash function to compute an index into an array of buckets. The hash function converts keys into array indices, enabling near-constant-time lookups. Collision resolution strategies like chaining or open addressing handle cases where multiple keys map to the same index. Hash tables are among the most versatile and performant data structures.",
    useCases: [
      "Database indexing and caching",
      "Implementing sets and dictionaries",
      "Counting frequencies and deduplication",
      "Symbol tables in compilers",
    ],
    complexity: [
      { operation: "Access", average: "O(1)", worst: "O(n)" },
      { operation: "Search", average: "O(1)", worst: "O(n)" },
      { operation: "Insertion", average: "O(1)", worst: "O(n)" },
      { operation: "Deletion", average: "O(1)", worst: "O(n)" },
    ],
    spaceComplexity: "O(n)",
    codeExamples: [
      {
        language: "javascript",
        label: "JavaScript",
        code: `// Hash table using Map (or plain object)
const phoneBook = new Map();

// Insert — O(1) average
phoneBook.set("Alice", "555-0101");
phoneBook.set("Bob", "555-0102");
phoneBook.set("Carol", "555-0103");

// Lookup — O(1) average
console.log(phoneBook.get("Alice"));  // 555-0101

// Check existence — O(1) average
if (phoneBook.has("Bob")) console.log("Found Bob");

// Delete — O(1) average
phoneBook.delete("Carol");

// Iterate
for (const [name, number] of phoneBook) {
  console.log(name + ": " + number);
}

console.log(phoneBook.get("Dave") ?? "Not found");`,
      },
      {
        language: "csharp",
        label: "C#",
        code: `using System.Collections.Generic;

var phoneBook = new Dictionary<string, string>();

// Insert — O(1) average
phoneBook["Alice"] = "555-0101";
phoneBook["Bob"]   = "555-0102";
phoneBook["Carol"] = "555-0103";

// Lookup — O(1) average
Console.WriteLine(phoneBook["Alice"]);

// Check existence — O(1) average
if (phoneBook.ContainsKey("Bob"))
  Console.WriteLine("Found Bob");

// Delete — O(1) average
phoneBook.Remove("Carol");

// Iterate
foreach (var kv in phoneBook)
  Console.WriteLine($"{kv.Key}: {kv.Value}");

Console.WriteLine(phoneBook.GetValueOrDefault("Dave", "Not found"));`,
      },
      {
        language: "python",
        label: "Python",
        code: `# Hash Table using Python dict

# Create
phone_book = {}

# Insert — O(1) average
phone_book["Alice"] = "555-0101"
phone_book["Bob"]   = "555-0102"
phone_book["Carol"] = "555-0103"

# Lookup — O(1) average
print(phone_book["Alice"])    # 555-0101

# Check existence — O(1) average
if "Bob" in phone_book:
    print("Found Bob")

# Delete — O(1) average
del phone_book["Carol"]

# Iterate
for name, number in phone_book.items():
    print(f"{name}: {number}")

# Get with default
val = phone_book.get("Dave", "Not found")
print(val)  # Not found`,
      },
      {
        language: "go",
        label: "Go",
        code: `package main

import "fmt"

func main() {
    phoneBook := make(map[string]string)

    // Insert — O(1) average
    phoneBook["Alice"] = "555-0101"
    phoneBook["Bob"]   = "555-0102"
    phoneBook["Carol"] = "555-0103"

    // Lookup — O(1) average
    fmt.Println(phoneBook["Alice"])

    // Check existence — O(1) average
    if _, ok := phoneBook["Bob"]; ok {
        fmt.Println("Found Bob")
    }

    // Delete — O(1) average
    delete(phoneBook, "Carol")

    for name, number := range phoneBook {
        fmt.Println(name + ": " + number)
    }
}`,
      },
    ],
    problems: [
      { id: "1", name: "Two Sum", difficulty: "Easy", url: "#" },
      { id: "2", name: "Valid Anagram", difficulty: "Easy", url: "#" },
      { id: "3", name: "Group Anagrams", difficulty: "Medium", url: "#" },
      { id: "4", name: "Top K Frequent Elements", difficulty: "Medium", url: "#" },
      { id: "5", name: "Longest Consecutive Sequence", difficulty: "Medium", url: "#" },
      { id: "6", name: "LRU Cache", difficulty: "Hard", url: "#" },
    ],
  },
  trees: {
    slug: "trees",
    theory:
      "A tree is a hierarchical data structure consisting of nodes connected by edges, with a single root node at the top. Each node can have zero or more child nodes, forming a parent-child relationship. Binary trees limit each node to at most two children. Binary Search Trees (BSTs) maintain a sorted order where left children are smaller and right children are larger, enabling efficient searching and sorting. Trees are the foundation for databases, file systems, and many algorithms.",
    useCases: [
      "File system directory structures",
      "Database indexing with B-trees",
      "HTML/XML DOM representation",
      "Decision trees in machine learning",
    ],
    complexity: [
      { operation: "Access", average: "O(log n)", worst: "O(n)" },
      { operation: "Search", average: "O(log n)", worst: "O(n)" },
      { operation: "Insertion", average: "O(log n)", worst: "O(n)" },
      { operation: "Deletion", average: "O(log n)", worst: "O(n)" },
    ],
    spaceComplexity: "O(n)",
    codeExamples: [
      {
        language: "javascript",
        label: "JavaScript",
        code: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

class BST {
  constructor() { this.root = null; }

  insert(val) {
    this.root = this._insert(this.root, val);
  }

  _insert(node, val) {
    if (!node) return new TreeNode(val);
    if (val < node.val) node.left = this._insert(node.left, val);
    else if (val > node.val) node.right = this._insert(node.right, val);
    return node;
  }

  search(val) {
    let node = this.root;
    while (node && node.val !== val)
      node = val < node.val ? node.left : node.right;
    return node;
  }

  inorder(node = this.root) {
    if (!node) return;
    this.inorder(node.left);
    console.log(node.val);
    this.inorder(node.right);
  }
}

const bst = new BST();
[8, 3, 10, 1, 6, 14, 4, 7].forEach(v => bst.insert(v));
bst.inorder();  // 1 3 4 6 7 8 10 14`,
      },
      {
        language: "csharp",
        label: "C#",
        code: `public class TreeNode {
  public int Val { get; set; }
  public TreeNode Left { get; set; }
  public TreeNode Right { get; set; }
  public TreeNode(int val) { Val = val; }
}

public class BST {
  private TreeNode root;

  public void Insert(int val) {
    root = Insert(root, val);
  }

  private TreeNode Insert(TreeNode node, int val) {
    if (node == null) return new TreeNode(val);
    if (val < node.Val) node.Left = Insert(node.Left, val);
    else if (val > node.Val) node.Right = Insert(node.Right, val);
    return node;
  }

  public TreeNode Search(int val) {
    var node = root;
    while (node != null && node.Val != val)
      node = val < node.Val ? node.Left : node.Right;
    return node;
  }

  public void Inorder(TreeNode node = null) {
    node ??= root;
    if (node == null) return;
    Inorder(node.Left);
    Console.Write(node.Val + " ");
    Inorder(node.Right);
  }
}`,
      },
      {
        language: "python",
        label: "Python",
        code: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, val):
        self.root = self._insert(self.root, val)

    def _insert(self, node, val):
        if not node:
            return TreeNode(val)
        if val < node.val:
            node.left = self._insert(node.left, val)
        elif val > node.val:
            node.right = self._insert(node.right, val)
        return node

    def search(self, val):
        return self._search(self.root, val)

    def _search(self, node, val):
        if not node or node.val == val:
            return node
        if val < node.val:
            return self._search(node.left, val)
        return self._search(node.right, val)

    def inorder(self, node=None, first=True):
        if first:
            node = self.root
        if node:
            self.inorder(node.left, False)
            print(node.val, end=" ")
            self.inorder(node.right, False)

# Usage
bst = BST()
for v in [8, 3, 10, 1, 6, 14, 4, 7]:
    bst.insert(v)
bst.inorder()  # 1 3 4 6 7 8 10 14`,
      },
      {
        language: "go",
        label: "Go",
        code: `package main

import "fmt"

type TreeNode struct {
    val   int
    left  *TreeNode
    right *TreeNode
}

type BST struct {
    root *TreeNode
}

func (b *BST) Insert(val int) {
    b.root = b.insert(b.root, val)
}

func (b *BST) insert(node *TreeNode, val int) *TreeNode {
    if node == nil {
        return &TreeNode{val: val}
    }
    if val < node.val {
        node.left = b.insert(node.left, val)
    } else if val > node.val {
        node.right = b.insert(node.right, val)
    }
    return node
}

func (b *BST) Inorder(node *TreeNode) {
    if node == nil { return }
    b.Inorder(node.left)
    fmt.Print(node.val, " ")
    b.Inorder(node.right)
}

func main() {
    var bst BST
    for _, v := range []int{8, 3, 10, 1, 6, 14, 4, 7} {
        bst.Insert(v)
    }
    bst.Inorder(bst.root)
}`,
      },
    ],
    problems: [
      { id: "1", name: "Maximum Depth of Binary Tree", difficulty: "Easy", url: "#" },
      { id: "2", name: "Invert Binary Tree", difficulty: "Easy", url: "#" },
      { id: "3", name: "Same Tree", difficulty: "Easy", url: "#" },
      { id: "4", name: "Validate Binary Search Tree", difficulty: "Medium", url: "#" },
      { id: "5", name: "Binary Tree Level Order Traversal", difficulty: "Medium", url: "#" },
      { id: "6", name: "Lowest Common Ancestor of a BST", difficulty: "Medium", url: "#" },
      { id: "7", name: "Serialize and Deserialize Binary Tree", difficulty: "Hard", url: "#" },
    ],
  },
  graphs: {
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
  },
  tries: {
    slug: "tries",
    theory:
      "A trie (pronounced 'try'), also called a prefix tree, is a tree-like data structure used to store a dynamic set of strings. Each node represents a single character, and paths from root to marked nodes form complete words. Tries excel at prefix-based operations, making them ideal for autocomplete systems, spell checkers, and IP routing tables. They trade space for speed, providing O(m) operations where m is the length of the key.",
    useCases: [
      "Autocomplete and typeahead suggestions",
      "Spell checking and correction",
      "IP routing (longest prefix matching)",
      "Word games and dictionary lookups",
    ],
    complexity: [
      { operation: "Search", average: "O(m)", worst: "O(m)" },
      { operation: "Insert", average: "O(m)", worst: "O(m)" },
      { operation: "Delete", average: "O(m)", worst: "O(m)" },
      { operation: "Prefix Search", average: "O(m + k)", worst: "O(m + k)" },
    ],
    spaceComplexity: "O(n * m)",
    codeExamples: [
      {
        language: "javascript",
        label: "JavaScript",
        code: `class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch))
        node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }

  search(word) {
    const node = this._find(word);
    return node != null && node.isEnd;
  }

  startsWith(prefix) {
    return this._find(prefix) != null;
  }

  _find(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return null;
      node = node.children.get(ch);
    }
    return node;
  }
}

const trie = new Trie();
trie.insert("apple");
trie.insert("app");
console.log(trie.search("app"));      // true
console.log(trie.startsWith("ap"));  // true`,
      },
      {
        language: "csharp",
        label: "C#",
        code: `using System.Collections.Generic;

public class TrieNode {
  public Dictionary<char, TrieNode> Children = new();
  public bool IsEnd;
}

public class Trie {
  private readonly TrieNode root = new();

  public void Insert(string word) {
    var node = root;
    foreach (char c in word) {
      if (!node.Children.ContainsKey(c))
        node.Children[c] = new TrieNode();
      node = node.Children[c];
    }
    node.IsEnd = true;
  }

  public bool Search(string word) {
    var node = Find(word);
    return node != null && node.IsEnd;
  }

  public bool StartsWith(string prefix) =>
    Find(prefix) != null;

  private TrieNode Find(string prefix) {
    var node = root;
    foreach (char c in prefix) {
      if (!node.Children.TryGetValue(c, out var next))
        return null;
      node = next;
    }
    return node;
  }
}`,
      },
      {
        language: "python",
        label: "Python",
        code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word):
        node = self._find(word)
        return node is not None and node.is_end

    def starts_with(self, prefix):
        return self._find(prefix) is not None

    def _find(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node

# Usage
trie = Trie()
trie.insert("apple")
trie.insert("app")
trie.insert("application")
print(trie.search("app"))        # True
print(trie.search("ap"))         # False
print(trie.starts_with("ap"))    # True`,
      },
      {
        language: "go",
        label: "Go",
        code: `package main

import "fmt"

type TrieNode struct {
    children map[byte]*TrieNode
    isEnd    bool
}

type Trie struct {
    root *TrieNode
}

func NewTrie() *Trie {
    return &Trie{root: &TrieNode{children: make(map[byte]*TrieNode)}}
}

func (t *Trie) Insert(word string) {
    node := t.root
    for i := 0; i < len(word); i++ {
        c := word[i]
        if node.children[c] == nil {
            node.children[c] = &TrieNode{children: make(map[byte]*TrieNode)}
        }
        node = node.children[c]
    }
    node.isEnd = true
}

func (t *Trie) Search(word string) bool {
    node := t.find(word)
    return node != nil && node.isEnd
}

func (t *Trie) StartsWith(prefix string) bool {
    return t.find(prefix) != nil
}

func (t *Trie) find(prefix string) *TrieNode {
    node := t.root
    for i := 0; i < len(prefix); i++ {
        c := prefix[i]
        if node.children[c] == nil { return nil }
        node = node.children[c]
    }
    return node
}

func main() {
    trie := NewTrie()
    trie.Insert("apple")
    trie.Insert("app")
    fmt.Println(trie.Search("app"))
    fmt.Println(trie.StartsWith("ap"))
}`,
      },
    ],
    problems: [
      { id: "1", name: "Implement Trie (Prefix Tree)", difficulty: "Medium", url: "#" },
      { id: "2", name: "Design Add and Search Words", difficulty: "Medium", url: "#" },
      { id: "3", name: "Replace Words", difficulty: "Medium", url: "#" },
      { id: "4", name: "Map Sum Pairs", difficulty: "Medium", url: "#" },
      { id: "5", name: "Word Search II", difficulty: "Hard", url: "#" },
    ],
  },
}

export function getTopicContent(slug: string): TopicContent | undefined {
  return topicContentMap[slug]
}
