import type { TopicContent } from "@/lib/topic-content"

export const content: TopicContent = {
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
}
