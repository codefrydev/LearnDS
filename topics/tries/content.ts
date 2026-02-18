import type { TopicContent } from "@/lib/topic-content"

export const content: TopicContent = {
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
}
