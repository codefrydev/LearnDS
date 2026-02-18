import type { TopicContent } from "@/lib/topic-content"

export const content: TopicContent = {
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
}
