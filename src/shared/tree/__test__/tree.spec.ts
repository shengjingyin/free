import { findEleDepth } from '../index';
import { treeData } from './tree.data';
describe('树形结构功能测试', () => {
  it('寻找某个元素在树的第几层', () => {
    const targetID = 0;
    const r = findEleDepth(treeData, targetID);
    expect(r).toBe(1);

    const targetID1 = 26;
    const r1 = findEleDepth(treeData, targetID1);
    expect(r1).toBe(3);

    const targetID2 = 164;
    const r2 = findEleDepth(treeData, targetID2);
    expect(r2).toBe(2);

    const targetID3 = 9997;
    const r3 = findEleDepth(treeData, targetID3);
    expect(r3).toBe(false);
  });
});
