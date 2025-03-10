//Assignment 1: Expression Tree due 3/12
class Node{
   constructor(val = null, left = null, right = null){
      this.val = val;
      this.left = left;
      this.right = right;
   }
 }

class Tree{
   constructor(root = null){
      this.root = root;
   }

   //checks if param is an operator and will return bool value
   isOperator(char){
      return ["+", "-", "*", "/"].includes(char);
   }

   infixToPostfix(infix){
      let postfix = [];   //final postfix expression
      let stack = [];     //operators stack
      let precedence = {"+": 1, "-": 1, "*": 2, "/": 2} //orders of operations precedence

      // Split expression into tokens (numbers and operators) to allow for regex searching
      let tokens = infix.match(/\d+|[+\-*/()]/g); 

      for(let token of tokens){
         if(/\d/.test(token)){         //if the token is a digit then push it to postfix stack
            postfix.push(token);
            console.log(token);
         }
         else if (token === "(") {  
            stack.push(token); 
        } else if (token === ")") {  
            while (stack.length && stack[stack.length - 1] !== "(") {   //pop operators stack until open parentheses appear
                postfix.push(stack.pop());                              //then push those on to postfix stack
            }
            stack.pop();  //pop the last open parentheses
        } else { 
            // 
            while (stack.length && precedence[stack[stack.length - 1]] >= precedence[token]) {
                postfix.push(stack.pop());
            }
            stack.push(token);  
        }
         
      }

      while(stack.length > 0){
         postfix.push(stack.pop());
      }

      return postfix;
   }
   

   //creates tree from postfix expression
   createTree(expression){
      let stack = [];

      for(let token of expression){     //loops through input expression
         let node = new Node(token);                      //creates a new node for each token in the expression

         if(this.isOperator(token)){       //If a character is an operator pop two values from the stack
            node.right = stack.pop();     //pop right node first (bc inorder traversal of the tree)
            node.left = stack.pop();
         }

         stack.push(node); // push current node onto the stack
      }

      this.root = stack.pop(); //the root of the tree will be the last remaining node in the stack
      console.log(this.root);
      return this.root;
   }

   //solves the expression tree recursively
   solve(node = this.root){
      if(node === null){     //base case --> if node is null, return
         return 0;
      }

      if(!node.left && !node.right){   //if node is a leaf node (aka an operand) 
         return parseFloat(node.val);  //return the number to stop recursing
      }

      let solveLeft = this.solve(node.left);    //recursively call solve on left tree
      let solveRight = this.solve(node.right);  //recursively call solve on right tree
      console.log("left subtree: ", solveLeft);
      console.log("right subtree: ", solveRight);

      //returns corresponding operation
      switch(node.val){
         case "+":
            return solveLeft + solveRight;
         case "-":
            return solveLeft - solveRight;
         case "*":
            return solveLeft * solveRight;
         case "/":
            return solveLeft / solveRight; 
         default:
            return 0;
      }

   }
}







// const numberButtons = document.querySelectorAll(".number_button");
// const data = {
//   runningSum: "",
// };

// function updateView(elementId) {
//   document.getElementById(elementId).textContent = data.runningSum;
//   console.log("updating view", data.runningSum);
// }

// function updateRunningSum(value) {
//   data.runningSum += value;
//   updateView("runningSum");
// }

// numberButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     updateRunningSum(e.target.textContent);
//   });
// });
