import { findEleDepth, findEleByKY, findEleByPath, findParent } from '../index';
import { treeData } from './tree.data';
describe('树形结构功能测试', () => {
  it('寻找某个元素在树的第几层', () => {
    const targetID = 0;
    const r = findEleDepth(treeData, targetID);
    expect(r).toBe(1);

    const targetID2 = 164;
    const r2 = findEleDepth(treeData, targetID2);
    expect(r2).toBe(2);

    const targetID3 = 9997;
    const r3 = findEleDepth(treeData, targetID3);
    expect(r3).toBe(false);
  });
  it('根据键值对，查找目标对象', () => {
    // 找到目标
    const target = { key: 'id', value: 27 };
    const r = findEleByKY(treeData, target);
    expect(r.name).toBe('武当'); // 怎么展示一个对象

    // 不存在
    const target2 = { key: 'id', value: 9999 };
    const r2 = findEleByKY(treeData, target2);
    expect(r2).toBe(false);
  });
  it('根据数组路径，查找目标对象', () => {
    // 找到目标
    const path = [0, 4, 26],
      key = 'id';
    const r = findEleByPath(treeData, key, path);
    expect(r.name).toBe('峨眉'); // 怎么展示一个对象
    // 不存在
    const path2 = [0, 4, 99999];
    const r2 = findEleByPath(treeData, key, path2);
    expect(r2).toBe(false); // 怎么展示一个对象
  });
  it('寻找当前对象的父节点', () => {
    // 找到目标
    const target = treeData.children[1];
    const r = findParent(treeData, target);
    expect(r.name).toBe('全部');
  });
});
