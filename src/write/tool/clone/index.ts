// 递归版本
export const cloneDeep1 = <T>(source: T): T => {
  const obj: T = {};
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object') {
        obj[key] = cloneDeep1(source[key]);
      } else {
        obj[key] = source[key];
      }
    }
  }
  return obj;
};
type TreeNode = {
  parent: Object;
  key: undefined | string;
  data: Object;
};
type UniQue = {
  source: Object;
  target: Object;
};
// 遍历版本
export const cloneDeep2 = <T extends Object>(source: T): T => {
  // 判断是否循环引用
  const unique: UniQue[] = [];
  // 结果
  const root: T = {};
  // 栈
  const loopList: TreeNode[] = [
    {
      parent: root,
      key: undefined,
      data: source,
    },
  ];

  while (loopList.length) {
    const node = loopList.pop() as TreeNode;
    const { parent, key, data } = node;
    let res = parent;

    if (key !== undefined) {
      res = parent[key] = {};
    }

    const uniqueData = unique.find(item => item.source === data);
    if (uniqueData && key) {
      parent[key] = uniqueData.target;
      break;
    } else {
      unique.push({
        source: data,
        target: res,
      });
    }

    for (const k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        const element = data[k];
        if (typeof element === 'object') {
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }
  return root;
};
