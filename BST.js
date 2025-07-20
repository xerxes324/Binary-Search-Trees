class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree{
    constructor(arr){
        this.arr = [...new Set(arr)].sort((a,b) => a-b);
        this.root = this.BuildTree(this.arr,0, this.arr.length - 1);
    }

    BuildTree(arr,start,end){
        if ( start > end ){
            return null;
        }

        let mid = Math.floor((start+end)/2);

        let root = new Node(arr[mid]);

        root.left = this.BuildTree(arr, start, mid-1);

        root.right = this.BuildTree(arr,mid+1,end);

        return root;
    }
}

export const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
