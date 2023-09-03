//@ts-nocheck
// interface IData<T> {
//   item: T;
//   priority: number;
// }

export class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  // Helper Methods
  private getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  private getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  private getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  private hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  private hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  private hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  private leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)];
  }

  private rightChild(index) {
    return this.heap[this.getRightChildIndex(index)];
  }

  private parent(index) {
    return this.heap[this.getParentIndex(index)];
  }

  private swap(indexOne, indexTwo) {
    const temp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = temp;
  }

  peek() {
    if (this.heap.length === 0) {
      return null;
    }
    return this.heap[0];
  }

  pop() {
    if (this.heap.length === 0) {
      return null;
    }
    const item = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();
    return item;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  push(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  private heapifyUp() {
    let index = this.heap.length - 1;
    while (
      this.hasParent(index) &&
      this.parent(index).priority > this.heap[index].priority
    ) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  private heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.rightChild(index).priority < this.leftChild(index).priority
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      if (this.heap[index].priority < this.heap[smallerChildIndex].priority) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }
}

// Creating The Priority Queue
// var PriQueue = new PriorityQueue();

// Adding the Elements
// PriQueue.push({ item: 32, priority: 10 });
// PriQueue.push({ item: 50, priority: 9 });
// PriQueue.push({ item: 12, priority: 14 });
// PriQueue.push({ item: 9, priority: 12 });
// PriQueue.push({ item: 33, priority: 11 });

// console.log(PriQueue.pop());
// console.log(PriQueue.pop());
// console.log(PriQueue.pop());
// console.log(PriQueue.pop());
// console.log(PriQueue.pop());
