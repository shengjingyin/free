import store from 'storejs';
import { useLowcodeStore } from '@/store/lowcode';
const lowcode = useLowcodeStore();
export const emptyObj = Object.create({});

// 类型判断
// 是否未定义
export function isUndef<T extends unknown>(v: T): boolean {
  return v === undefined || v === null;
}

// 是否有意义
export function isDef<T extends unknown>(v: T): boolean {
  return v !== undefined && v !== null;
}

export function isTrue<T extends unknown>(v: T): boolean {
  return v === true;
}

export function isFalse<T extends unknown>(v: T): boolean {
  return v === false;
}

// 判断是否为基础数据类型
export function isPrimitive<T extends unknown>(v: T): boolean {
  return (
    typeof v === 'string' ||
    typeof v === 'number' ||
    typeof v === 'symbol' ||
    typeof v === 'boolean'
  );
}

export function isPromise<T extends Promise<unknown>>(v: T): boolean {
  return isDef(v) && typeof v.then === 'function' && typeof v.catch === 'function';
}

// 检查对象是否包含某个 key
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj: object | any[], key: string): boolean {
  return hasOwnProperty.call(obj, key);
}

// 空函数
export function noop(a?: any, b?: any, c?: any) {}

const _toString = Object.prototype.toString;

export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]';
}
export function isEmptyObject(obj: Object): boolean {
  return Object.keys(obj).length === 0;
}

// 单次执行
// export function once(fn: Function): Function {
//     let called = false;
//     return function () {
//         if (!called) {
//             called = true;
//             fn.apply(null, arguments);
//         }
//     };
// }
// export function once(fn: Function): Function {
//     let called = false;
//     return function (this: any) {
//         if (!called) {
//             called = true;
//             fn.apply(this, arguments);
//         }
//     };
// }

export function once(fn: Function): Function {
  let called = false;

  return (...args: any) => {
    if (!called) {
      called = true;
      fn(...args);
    }
  };
}

export const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

// 获取当前组件的最新id
export function generateKey(type: string) {
  const index = lowcode.idMap.hasOwnProperty(type) ? lowcode.idMap[type] + 1 : 1;
  return index;
}
// 保存id信息
export function saveIdMap(type: string, id: number) {
  lowcode.idMap[type] = id;
  // id 从1 开始
  ++lowcode.idMap.total;
  store.set('idMap', JSON.stringify(lowcode.idMap));
}

export const extend = Object.assign;
