/**
 * 返回目标所在树中的层级
 * @param {} tree - 树形数据
 * @returns {}
 */
export function findEleDepth(tree, id, int = 1) {
  // 匹配到对应元素
  if (tree.id == id) {
    return int;
  }
  // 深度结束条件
  if (!tree.children) {
    return false;
  }
  for (let i = 0; i < tree.children.length; i++) {
    // 递归的去找每一个子项
    const depth = findEleDepth(tree.children[i], id, int + 1);
    if (depth) {
      return depth; // 返回最终结果
    }
  }
  return false; // 未找到
}
