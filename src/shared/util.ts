export const emptyObj = Object.create({});

// 类型判断
// 是否未定义
export function isUndef(v: any): boolean {
    return v === undefined || v === null;
}

// 是否有意义
export function isDef(v: any): boolean {
    return v !== undefined && v !== null;
}

export function isTrue(v: any): boolean {
    return v === true;
}

export function isFalse(v: any): boolean {
    return v === false;
}

// 判断是否为基础数据类型
export function isPrimitive(v: any): boolean {
    return typeof v === "string" || typeof v === "number" || typeof v === "symbol" || typeof v === "boolean";
}

export function isPromise(val: any): boolean {
    return isDef(val) && typeof val.then === "function" && typeof val.catch === "function";
}

// 检查对象是否包含某个 key
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj: object | any[], key: string): boolean {
    return hasOwnProperty.call(obj, key);
}

// 空函数
export function noop(a?: any, b?: any, c?: any) {}

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

export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
