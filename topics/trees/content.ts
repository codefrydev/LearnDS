import type { TopicContent } from "@/lib/topic-content"

export const content: TopicContent = {
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
}
