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
        language: "java",
        label: "Java",
        code: `import java.util.ArrayList;
import java.util.Arrays;

public class ArrayExample {
    public static void main(String[] args) {
        // Static array
        int[] arr = {10, 20, 30, 40, 50};

        // Access by index — O(1)
        System.out.println(arr[2]); // 30

        // Dynamic array (ArrayList)
        ArrayList<Integer> list = new ArrayList<>(
            Arrays.asList(10, 20, 30, 40, 50)
        );

        // Insert at position — O(n)
        list.add(2, 25);

        // Append to end — Amortized O(1)
        list.add(60);

        // Delete by index — O(n)
        list.remove(2);

        System.out.println(list);
    }
}`,
      },
      {
        language: "cpp",
        label: "C++",
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Dynamic array using vector
    vector<int> arr = {10, 20, 30, 40, 50};

    // Access by index — O(1)
    cout << arr[2] << endl;  // 30

    // Insert at position — O(n)
    arr.insert(arr.begin() + 2, 25);

    // Append to end — Amortized O(1)
    arr.push_back(60);

    // Delete by iterator — O(n)
    arr.erase(arr.begin() + 2);

    // Print
    for (int x : arr) cout << x << " ";
    cout << endl;

    return 0;
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
        language: "java",
        label: "Java",
        code: `public class LinkedList {
    static class Node {
        int data;
        Node next;
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    Node head;

    void append(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        Node curr = head;
        while (curr.next != null)
            curr = curr.next;
        curr.next = newNode;
    }

    void prepend(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }

    void delete(int data) {
        if (head == null) return;
        if (head.data == data) {
            head = head.next;
            return;
        }
        Node curr = head;
        while (curr.next != null
               && curr.next.data != data)
            curr = curr.next;
        if (curr.next != null)
            curr.next = curr.next.next;
    }

    void display() {
        Node curr = head;
        while (curr != null) {
            System.out.print(curr.data + " -> ");
            curr = curr.next;
        }
        System.out.println("null");
    }
}`,
      },
      {
        language: "cpp",
        label: "C++",
        code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

class LinkedList {
    Node* head = nullptr;
public:
    void append(int data) {
        Node* node = new Node(data);
        if (!head) { head = node; return; }
        Node* curr = head;
        while (curr->next) curr = curr->next;
        curr->next = node;
    }

    void prepend(int data) {
        Node* node = new Node(data);
        node->next = head;
        head = node;
    }

    void remove(int data) {
        if (!head) return;
        if (head->data == data) {
            Node* tmp = head;
            head = head->next;
            delete tmp;
            return;
        }
        Node* curr = head;
        while (curr->next && curr->next->data != data)
            curr = curr->next;
        if (curr->next) {
            Node* tmp = curr->next;
            curr->next = curr->next->next;
            delete tmp;
        }
    }

    void display() {
        Node* curr = head;
        while (curr) {
            cout << curr->data << " -> ";
            curr = curr->next;
        }
        cout << "null" << endl;
    }
};`,
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
        language: "java",
        label: "Java",
        code: `import java.util.ArrayDeque;
import java.util.Deque;

public class StackExample {
    public static void main(String[] args) {
        Deque<Integer> stack = new ArrayDeque<>();

        // Push — O(1)
        stack.push(10);
        stack.push(20);
        stack.push(30);

        // Peek — O(1)
        System.out.println(stack.peek()); // 30

        // Pop — O(1)
        System.out.println(stack.pop());  // 30

        // Size
        System.out.println(stack.size()); // 2

        // Check empty
        System.out.println(stack.isEmpty());
    }
}`,
      },
      {
        language: "cpp",
        label: "C++",
        code: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;

    // Push — O(1)
    s.push(10);
    s.push(20);
    s.push(30);

    // Top (peek) — O(1)
    cout << s.top() << endl;  // 30

    // Pop — O(1)
    s.pop();
    cout << s.top() << endl;  // 20

    // Size
    cout << s.size() << endl; // 2

    // Check empty
    cout << boolalpha << s.empty() << endl;

    return 0;
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
        language: "java",
        label: "Java",
        code: `import java.util.LinkedList;
import java.util.Queue;

public class QueueExample {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();

        // Enqueue — O(1)
        queue.add("A");
        queue.add("B");
        queue.add("C");

        // Peek (front) — O(1)
        System.out.println(queue.peek()); // A

        // Dequeue — O(1)
        System.out.println(queue.poll()); // A

        // Size
        System.out.println(queue.size()); // 2
    }
}`,
      },
      {
        language: "cpp",
        label: "C++",
        code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<string> q;

    // Enqueue — O(1)
    q.push("A");
    q.push("B");
    q.push("C");

    // Front — O(1)
    cout << q.front() << endl; // A

    // Dequeue — O(1)
    q.pop();
    cout << q.front() << endl; // B

    // Size
    cout << q.size() << endl;  // 2

    return 0;
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
        language: "java",
        label: "Java",
        code: `import java.util.HashMap;
import java.util.Map;

public class HashTableExample {
    public static void main(String[] args) {
        Map<String, String> phoneBook =
            new HashMap<>();

        // Insert — O(1) average
        phoneBook.put("Alice", "555-0101");
        phoneBook.put("Bob",   "555-0102");
        phoneBook.put("Carol", "555-0103");

        // Lookup — O(1) average
        System.out.println(
            phoneBook.get("Alice")
        );

        // Check existence — O(1) average
        if (phoneBook.containsKey("Bob")) {
            System.out.println("Found Bob");
        }

        // Delete — O(1) average
        phoneBook.remove("Carol");

        // Iterate
        for (var entry : phoneBook.entrySet()) {
            System.out.println(
                entry.getKey() + ": "
                + entry.getValue()
            );
        }
    }
}`,
      },
      {
        language: "cpp",
        label: "C++",
        code: `#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, string> phoneBook;

    // Insert — O(1) average
    phoneBook["Alice"] = "555-0101";
    phoneBook["Bob"]   = "555-0102";
    phoneBook["Carol"] = "555-0103";

    // Lookup — O(1) average
    cout << phoneBook["Alice"] << endl;

    // Check existence — O(1) average
    if (phoneBook.count("Bob")) {
        cout << "Found Bob" << endl;
    }

    // Delete — O(1) average
    phoneBook.erase("Carol");

    // Iterate
    for (auto& [name, num] : phoneBook) {
        cout << name << ": " << num << endl;
    }

    return 0;
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
        language: "java",
        label: "Java",
        code: `public class BST {
    static class Node {
        int val;
        Node left, right;
        Node(int val) { this.val = val; }
    }

    Node root;

    void insert(int val) {
        root = insert(root, val);
    }

    Node insert(Node node, int val) {
        if (node == null) return new Node(val);
        if (val < node.val)
            node.left = insert(node.left, val);
        else if (val > node.val)
            node.right = insert(node.right, val);
        return node;
    }

    Node search(Node node, int val) {
        if (node == null || node.val == val)
            return node;
        if (val < node.val)
            return search(node.left, val);
        return search(node.right, val);
    }

    void inorder(Node node) {
        if (node != null) {
            inorder(node.left);
            System.out.print(node.val + " ");
            inorder(node.right);
        }
    }

    public static void main(String[] args) {
        BST bst = new BST();
        int[] vals = {8, 3, 10, 1, 6, 14, 4, 7};
        for (int v : vals) bst.insert(v);
        bst.inorder(bst.root);
        // 1 3 4 6 7 8 10 14
    }
}`,
      },
      {
        language: "cpp",
        label: "C++",
        code: `#include <iostream>
using namespace std;

struct Node {
    int val;
    Node *left, *right;
    Node(int v) : val(v), left(nullptr),
                  right(nullptr) {}
};

class BST {
    Node* root = nullptr;

    Node* insert(Node* node, int val) {
        if (!node) return new Node(val);
        if (val < node->val)
            node->left = insert(node->left, val);
        else if (val > node->val)
            node->right = insert(node->right, val);
        return node;
    }

    Node* search(Node* node, int val) {
        if (!node || node->val == val)
            return node;
        if (val < node->val)
            return search(node->left, val);
        return search(node->right, val);
    }

    void inorder(Node* node) {
        if (node) {
            inorder(node->left);
            cout << node->val << " ";
            inorder(node->right);
        }
    }

public:
    void insert(int val) {
        root = insert(root, val);
    }
    void print() { inorder(root); }
};

int main() {
    BST bst;
    for (int v : {8,3,10,1,6,14,4,7})
        bst.insert(v);
    bst.print();
    // 1 3 4 6 7 8 10 14
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
        language: "java",
        label: "Java",
        code: `import java.util.*;

public class Graph {
    Map<Integer, List<Integer>> adj =
        new HashMap<>();

    void addEdge(int u, int v) {
        adj.computeIfAbsent(u,
            k -> new ArrayList<>()).add(v);
        adj.computeIfAbsent(v,
            k -> new ArrayList<>()).add(u);
    }

    List<Integer> bfs(int start) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        List<Integer> order = new ArrayList<>();

        visited.add(start);
        queue.add(start);

        while (!queue.isEmpty()) {
            int node = queue.poll();
            order.add(node);
            for (int nb : adj.getOrDefault(
                    node, List.of())) {
                if (!visited.contains(nb)) {
                    visited.add(nb);
                    queue.add(nb);
                }
            }
        }
        return order;
    }

    public static void main(String[] args) {
        Graph g = new Graph();
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        g.addEdge(2, 4);
        System.out.println(g.bfs(0));
    }
}`,
      },
      {
        language: "cpp",
        label: "C++",
        code: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>
#include <unordered_map>
using namespace std;

class Graph {
    unordered_map<int, vector<int>> adj;
public:
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<int> bfs(int start) {
        unordered_set<int> visited;
        queue<int> q;
        vector<int> order;

        visited.insert(start);
        q.push(start);

        while (!q.empty()) {
            int node = q.front(); q.pop();
            order.push_back(node);
            for (int nb : adj[node]) {
                if (!visited.count(nb)) {
                    visited.insert(nb);
                    q.push(nb);
                }
            }
        }
        return order;
    }
};

int main() {
    Graph g;
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(2, 4);
    for (int x : g.bfs(0))
        cout << x << " ";
    // 0 1 2 3 4
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
        language: "java",
        label: "Java",
        code: `public class Trie {
    static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd = false;
    }

    TrieNode root = new TrieNode();

    void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (node.children[i] == null)
                node.children[i] = new TrieNode();
            node = node.children[i];
        }
        node.isEnd = true;
    }

    boolean search(String word) {
        TrieNode node = find(word);
        return node != null && node.isEnd;
    }

    boolean startsWith(String prefix) {
        return find(prefix) != null;
    }

    TrieNode find(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            int i = c - 'a';
            if (node.children[i] == null)
                return null;
            node = node.children[i];
        }
        return node;
    }

    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert("apple");
        trie.insert("app");
        System.out.println(trie.search("app"));
        System.out.println(
            trie.startsWith("ap")
        );
    }
}`,
      },
      {
        language: "cpp",
        label: "C++",
        code: `#include <iostream>
#include <unordered_map>
using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isEnd = false;
};

class Trie {
    TrieNode* root = new TrieNode();

public:
    void insert(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c))
                node->children[c] =
                    new TrieNode();
            node = node->children[c];
        }
        node->isEnd = true;
    }

    bool search(const string& word) {
        TrieNode* node = find(word);
        return node && node->isEnd;
    }

    bool startsWith(const string& prefix) {
        return find(prefix) != nullptr;
    }

private:
    TrieNode* find(const string& prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (!node->children.count(c))
                return nullptr;
            node = node->children[c];
        }
        return node;
    }
};

int main() {
    Trie trie;
    trie.insert("apple");
    trie.insert("app");
    cout << boolalpha;
    cout << trie.search("app") << endl;
    cout << trie.startsWith("ap") << endl;
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
