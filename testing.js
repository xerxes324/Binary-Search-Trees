import { Tree, prettyPrint } from "./BST.js";

let array1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree(array1)
prettyPrint(tree.root);