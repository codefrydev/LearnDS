import type { TopicContent } from "@/lib/topic-content"

export const content: TopicContent = {
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
}
