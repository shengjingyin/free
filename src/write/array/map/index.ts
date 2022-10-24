/* 

  [1, 2, 3].map((item, index, arr) => item * 2)  -> [2, 4, 6]
*/
interface Array {
  myMap: () => any[];
}
Array.prototype.myMap = (fn: Function) => {};
