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
    


    levelOrderForEach(callbackfunction, root){
      if ( root === null){
        return;
      }
      let queue = [root];

      while ( queue.length){

        let levelsize = queue.length;
        let levelnodes = [];

        for ( let i = 0 ; i < levelsize ; i++){

          let node = queue.shift();
          levelnodes.push(node.data);

          if ( node.left){
            queue.push(node.left)
          }
          if ( node.right ){
            queue.push(node.right);
          }
        }
        callbackfunction(levelnodes);
      }
    }


    inOrderForEach(callbackfunction, root){
        if ( root === null){
          return;
        }
        this.inOrderForEach(callbackfunction, root.left);
        callbackfunction(root.data);
        this.inOrderForEach(callbackfunction, root.right);
    }

    preOrderForEach(callbackfunction, root){
      if ( root === null){
        return;
      }

      callbackfunction(root.data);
      this.preOrderForEach(callbackfunction, root.left);
      this.preOrderForEach(callbackfunction, root.right);
    }

    postOrderForEach(callbackfunction, root){

      let visited = [false]
      let stack = [root];

      while ( stack.length ){

        let cur = stack.pop();
        let v = visited.pop();
        if ( cur ){
          if (v){
            callbackfunction(cur.data);
          }
          else{
            stack.push(cur);
            visited.push(true);
            stack.push(cur.right);
            visited.push(false);
            stack.push(cur.left);
            visited.push(false);
          }
        }
      }
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
