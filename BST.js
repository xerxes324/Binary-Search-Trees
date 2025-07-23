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
    
    deleteItem(root,value){

      if ( root === null){
        return root;
      }

      if ( value > root.data){
        root.right = this.deleteItem(root.right, value)
      }
      else if ( value < root.data){
        root.left = this.deleteItem(root.left, value);
      }

      else{

        if ( root.left === null){
          return root.right;
        }
        else if ( root.right === null){
          return root.left;
        }

        let cur = root.right;
        while ( cur.left !== null){
          cur = cur.left
        }

        root.data = cur.data;
        root.right = this.deleteItem(root.right,root.data)
      }

      return root;
    }


    insert(root,value){
      if( root === null ){
        let node = new Node(value);
        return node;
      }

      if ( value < root.data){
        let leftnode = this.insert(root.left, value);

        if(leftnode){
          root.left = leftnode;
        }
      }

      else{
        let rightnode = this.insert(root.right, value);
        if ( rightnode ){
          root.right = rightnode;
        }
      }

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
    
    find(value){
      return this.findHelper(this.root,value);
    }

    findHelper(root,value){
      if ( root === null){
        return root
      }

      if ( value > root.data){
        return this.findHelper(root.right, value)
      }
      else if ( value < root.data){
        return this.findHelper(root.left, value);
      }
      else{
        return root;
      }
      
    }

    height(value){
      return this.heightHelper(this.root, value);
    }

    heightHelper(root,value){
      
      if ( root === null ){
        return false;
      }

      let flag = false;

      function dfs(root,value){


        if ( root === null){
          return 0;
        }

        let left = dfs(root.left, value)
        let right = dfs(root.right, value)

        if ( root.data === value){
          flag = true;
          return Math.max(left,right);
        }

        return 1 + Math.max(left,right);
      }
      
      let result = dfs(root,value);
      if ( flag === true ){
        return result
      }
      return false;
    }

    depth(value){
      return this.depthHelper(this.root,value);
    }

    depthHelper(root,value){
      
      if ( root === null){
        return null;
      }

      function dfs(root,value){

        if ( root === null){
          return false;
        }

        if ( value < root.data){
         let left = dfs(root.left, value)
         if ( left !== false){
          return 1 + left;
         }
         return false;
        }

        if ( value > root.data){
          let right = dfs(root.right, value)
          if ( right !== false)
          {
            return 1 + right;
          }
          return false;
        }

        else{
          return 0;
        }

      }


      let call = dfs(root,value)
      if (call === false){
        return null;
      }
      return call;
    }

    isBalanced(){
      return this.isBalancedHelper(this.root);
    }

    isBalancedHelper(root){

      function dfs(root){

        if ( root === null){
          return 0;
        }

        let left = dfs(root.left)
        if ( left == -1){
          return -1
        }
        let right = dfs(root.right)
        if ( right == -1){
          return -1
        }

        if ( Math.abs(left-right) > 1){
          return -1
        }

        return 1 + Math.max(left,right);
      }

      return dfs(root) !== -1; // returns False if -1 , else True.
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
