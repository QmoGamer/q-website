<template>
  <div class="binary-tree">
    <div class="binary-tree-table">
      <ul>
        <Node :node="tree.root" class="root"></Node>
      </ul>
    </div>
    <button class="btn btn-info" @click="insert">Add</button>
  </div>
</template>

<script>
import Node from '@/components/Node'

class BTNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  search(data, node = this.root) {
    let curNode = node;
    while (curNode) {
      if (data === curNode.data) {
        return curNode;
      }
      if (data < curNode.data) {
        curNode = curNode.left;
      } else {
        curNode = curNode.right;
      }
    }
    return null;
  }

  insert(data) {
    if (!this.root) {
      this.root = new BTNode(data);
      return;
    }

    let curNode = this.root;
    while (curNode) {
      if (data < curNode.data) {
        if (curNode.left) {
          curNode = curNode.left;
        } else {
          curNode.left = new BTNode(data);
          break;
        }
      } else if (data > curNode.data) {
        if (curNode.right) {
          curNode = curNode.right;
        } else {
          curNode.right = new BTNode(data);
          break;
        }
      } else {
        break;
      }
    }
  }

  findMin(node = this.root) {
    let currentNode = node;
    while (currentNode && currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  findMax(node = this.root) {
    let currentNode = node;
    while (currentNode && currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode;
  }

  remove(data) {
    const removeNode = (data, node) => {
      const curNode = node;
      // 1
      if (!curNode) {
        return false;
      }
      // 2
      if (data < curNode.data) {
        curNode.left = removeNode(data, curNode.left);
      // 3
      } else if (data > curNode.data) {
        curNode.right = removeNode(data, curNode.right);
      // 4
      } else {
        // 4.1
        if (!curNode.left && !curNode.right) {
          return null;
        }
        // 4.2
        if (!curNode.left) {
          return curNode.right;
        }
        if (!curNode.right) {
          return curNode.left;
        }
        // 4.3
        const aux = this.findMin(curNode.right);
        curNode.data = aux.data;
        curNode.right = removeNode(aux.data, curNode.right);
      }
      return curNode;
    };
    this.root = removeNode(data, this.root);
  }
  
  preOrderTraversal() {
    const temp = [];
    preHelper(this.root);
    return temp;

    function preHelper(node) {
      if (node) {
        temp.push(node.data);
        preHelper(node.left);
        preHelper(node.right);
      }
    }
  }
  
  inOrderTraversal() {
    const temp = [];
    inHelper(this.root);
    return temp;

    function inHelper(node) {
      if (node) {
        inHelper(node.left);
        temp.push(node.data);
        inHelper(node.right);
      }
    }
  }

  postOrderTraversal() {
    const temp = [];
    postHelper(this.root);
    return temp;

    function postHelper(node) {
      if (node) {
        postHelper(node.left);
        postHelper(node.right);
        temp.push(node.data);
      }
    }
  }
  
  levelorderTraversal() {
    const temp = [];
    const queue = [];

    if (this.root) {
      queue.push(this.root);
    }

    while (queue.length) {
      const subTemp = [];
      const len = queue.length;

      for (let i = 0; i < len; i += 1) {
        const node = queue.shift();
        subTemp.push(node.data);
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      }

      temp.push(subTemp);
    }
    return temp;
  }
  
  balanceBST() {
    const nodeList = this.inOrderTraversal();
    const { length } = nodeList;
    if (length < 3) {
      return this.root;
    }

    this.root = rebuild(0, length - 1);

    function rebuild(start, end) {
      if (start > end) {
        return null;
      }
      const mid = Math.floor((start + end) / 2);
      const node = new BTNode(nodeList[mid]);
      node.left = rebuild(start, mid - 1);
      node.right = rebuild(mid + 1, end);
      return node;
    }
  }
}

export default {
  name: 'BinaryTree',
  components: {
    Node
  },
  data: () => ({
    tree: new BinarySearchTree(),
    data: 0,
    traversal: 'inOrder',
  }),
  created() {
    this.tree.insert(500);
  },
  methods: {
    insert() {
      const random = Number((Math.random() * 1000).toFixed());
      this.tree.insert(random);
    },
    remove(data) {
      this.tree.remove(data);
    },
    balanceBST() {
      this.tree.balanceBST();
    }
  },
}
</script>

<style lang="scss" scoped>
.binary-tree {
  .binary-tree-table {
    border: 1px solid #ccc;
    .row {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
      &:not(:last-child) {
        border-bottom: 1px solid #ccc;
      }
      span {
        flex: 1;
        height: 100%;
        &:not(:last-child) {
          border-right: 1px solid #ccc;
        }
      }
    }
  }
  button {
    margin-top: 40px;
  }
}
ul {
  display: flex;
  li {
    flex: 1;
  }
}
</style>