import { Tree, prettyPrint } from "./BST.js";

let array1 = [43,4,2,3,5,19,184,66,3,33,8];
let tree = new Tree(array1)
tree.insert(tree.root, 195)
console.log("Balanced : ",tree.isBalanced());
prettyPrint(tree.root);

tree.rebalance();
prettyPrint(tree.root);
console.log("Balanced now? : ", tree.isBalanced());
console.log("inorder: ")
tree.inOrderForEach((val)=>console.log(val), tree.root);
console.log("Preorder:")    
tree.preOrderForEach((val)=>console.log(val), tree.root);
console.log("Postorder");
tree.postOrderForEach((val)=> console.log(val), tree.root);
