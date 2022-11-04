import { createData } from '../../createData/index';
import { cloneDeep2 } from '../index';

describe('clone ', () => {
  it('clone deep', () => {
    const origin: any = {};
    origin.a = origin; // 循环引用 爆栈 Maximum call stack size exceeded，可以遍历解决
    const newData = cloneDeep2(origin);
    console.log('🚀 ~ file: clone.spec.ts ~ line 7 ~ it ~ origin', origin);
    console.log('🚀 ~ file: clone.spec.ts ~ line 7 ~ it ~ newData', newData);
    expect(newData).toEqual(origin);
  });
});
