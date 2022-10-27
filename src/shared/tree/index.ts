import { cloneDeep } from 'lodash';
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
/* 
  根据目标键值对，查找目标对象
*/
export function findEleByKY(tree, { key = 'id', value = 'value' }: KV) {
  // 匹配到对应元素
  if (tree[key] == value) {
    return tree;
  }
  // 深度结束条件
  if (!tree.children) {
    return false;
  }
  for (let i = 0; i < tree.children.length; i++) {
    // 递归的去找每一个子项
    const target = findEleByKY(tree.children[i], { key, value });
    if (target) {
      return target; // 返回最终结果
    }
  }
  return false; // 未找到
}
/**
 * 根据路径，查找目标对象
 * @param {Array<component>} tree - 所有元素集合
 * @param {Array<string>} path - 路径《完整》
 * @returns {Object} 具有响应式的目标元素
 */
export function findEleByPath(tree, key: string, originPath: unknown[]) {
  let target,
    data = [tree];
  const path = cloneDeep(originPath);

  while (path.length) {
    const first = path.shift();

    target = data.find(item => item[key] === first);
    if (target) {
      data = target.children;
    } else {
      return false;
    }
  }
  return target;
}
