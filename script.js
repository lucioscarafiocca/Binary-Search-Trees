const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
  }
}

function Node() {
  const data = 0
  const left = 0
  const right = 0
  return { data, left, right }
}

function Tree(array) {
  let root = sortArray(array)
  const insert = (value, current = root) => {
    ///say no to wrong value
    if (!find(value)) {
      if (value > current.data) {
        if (current.right == null) {
          current.right = Node()
          current.right.data = value
          current.right.left = null
          current.right.right = null
          current.right.parent = current
          return
        } else {
          let nextcurrent = current.right
          insert(value, nextcurrent)
        }
        return
      } else {
        if (current.left == null) {
          current.left = Node()
          current.left.data = value
          current.left.left = null
          current.left.right = null
          current.left.parent = current
          return
        } else {
          let nextcurrent = current.left
          insert(value, nextcurrent)
        }
      }
    }
    return
  }
  const find = (value, current = root) => {
    if (current == null) {
      return null
    }
    if (value == current.data) {
      answer = current
      return answer
    } else if (current.data != undefined) {
      if (value > current.data) {
        let nextcurrent = current.right
        return find(value, nextcurrent)
      } else {
        let nextcurrent = current.left
        return find(value, nextcurrent)
      }
    }
  }
  const deleteItem = (value) => {
    if (find(value)) {
      let node = tree.find(value)
      let previousNode = node.parent
      if (node.left == null && node.right == null) {
        if ((previousNode.right = node)) {
          previousNode.right = null
        }
        previousNode.left = null
      } else if (node.left == null || node.right == null) {
        if (node.left == null) {
          if (node.parent.left.data == node.data) {
            node.parent.left = node.right
            node.right.parent = node.parent
          } else {
            node.parent.right = node.right
            node.left.parent = node.parent
          }
          return
        }
        if (node.parent.right.data == node.data) {
          node.parent.right = node.left
          node.left.parent = node.parent
        } else {
          node.parent.left = node.left
          node.right.parent = node.parent
        }
      } else {
        if (node.right !== null) {
          let answer = node.right
          for (let i = node.right; i.left !== null; ) {
            i = i.left
            answer = i
          }
          node.data = answer.data
          if (answer.parent.left.data == answer.data) {
            answer.parent.left = answer.right
          } else {
            answer.parent.right = answer.right
          }
        }
      }
    }
  }

  const levelOrder = (func) => {
    //let array = []
    if (typeof func == "function") {
      for (queue = [root]; queue != 0; ) {
        if (queue[0].left !== null && queue[0].right !== null) {
          queue.push(queue[0].left)
          queue.push(queue[0].right)
        } else if (queue[0].right !== null) {
          queue.push(queue[0].right)
        } else if (queue[0].left !== null) {
          queue.push(queue[0].left)
        }
        func(queue.shift()) //  array.push(queue.shift().data)
      }
      return
    }
    throw new Error("parameter is not a callback function")
    // return array
  }

  const PreOrder = (func, current = root) => {
    if (typeof func == "function") {
      if (current == null) {
        return
      }
      func(current)
      PreOrder(func, current.left)
      PreOrder(func, current.right)
      return
    }
    throw new Error("parameter is not a callback function")
  }

  const InOrder = (func, current = root) => {
    if (typeof func == "function") {
      if (current == null) {
        return
      }
      InOrder(func, current.left)
      console.log(current)
      InOrder(func, current.right)
    }
    throw new Error("parameter is not a callback function")
  }

  const PostOrder = (func, current = root) => {
    if (typeof func == "function") {
      if (current == null) {
        return
      }
      PostOrder(func, current.left)
      PostOrder(func, current.right)
      console.log(current)
    }
    throw new Error("parameter is not a callback function")
  }
  const height = (value, current = find(value)) => {
    if (current == null) {
      return -1
    } else {
      let nodeLeft = height(value, current.left)
      let nodeRight = height(value, current.right)

      return Math.max(nodeLeft, nodeRight) + 1
    }
  }

  const depth = (current = root) => {
    if (current == null) {
      return -1
    } else {
      let nodeLeft = depth(current.left)
      let nodeRight = depth(current.right)

      return Math.max(nodeLeft, nodeRight) + 1
    }
  }

  const isBalanced = (current = root) => {
    if (current == null) {
      return
    }
    let nodeLeft = depth(current.left)
    let nodeRight = depth(current.right)

    if (nodeLeft - nodeRight > -2) {
      return true
    }
    isBalanced(current.right)
    isBalanced(current.left)
    return false
  }

  const rebalance = (current = root, array = []) => {
    if (current == null) {
      return null
    }
    array.push(current.data)
    rebalance(current.left, array)
    rebalance(current.right, array)
    obj.root = sortArray(array)
  }

  const obj = {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    PreOrder,
    InOrder,
    PostOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  }

  return obj
}

function buildTree(array, start = 0, end = array.length - 1, parent = null) {
  if (start > end) {
    return null
  } else {
    let mid = Math.floor((start + end) / 2)
    let root = Node()
    root.data = array[mid]
    root.left = buildTree(array, start, mid - 1, root)
    root.right = buildTree(array, mid + 1, end, root)
    root.parent = parent

    return root
  }
}
function sortArray(array) {
  let sortedArr = []
  array.forEach((element) => {
    if (sortedArr.includes(element)) {
    } else {
      sortedArr.push(element)
    }
  })
  let result = sortedArr.sort(function (a, b) {
    return a - b
  })
  return buildTree(result)
}

function findPrevious(value, current = tree.root) {
  if (value == current.right.data || value == current.left.data) {
    answer = current
    return answer
  } else {
    if (value > current.data) {
      let nextcurrent = current.right
      return findPrevious(value, nextcurrent)
    } else {
      let nextcurrent = current.left
      return findPrevious(value, nextcurrent)
    }
  }
}

function callback(node) {
  console.log(node)
}

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
