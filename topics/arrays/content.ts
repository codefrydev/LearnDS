import type { TopicContent } from "@/lib/topic-content"

export const content: TopicContent = {
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
}
