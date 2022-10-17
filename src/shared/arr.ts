import _ from "lodash";
/* 
根据传入的key 拍平数组（应用与树形结构拍平）
*/
export const flatByKey = (depArr: any[], key: string) => {
    let flatR: any[] = [];
    let _depArr = _.cloneDeep(depArr);
    for (let i = 0; i < _depArr.length; i++) {
        const item = _depArr[i];
        flatR.push(item);
        while (item[key]) {
            _depArr.splice(i + 1, 0, ...item[key]);
            item[key] = null;
        }
    }
    return flatR;
};

/* 
寻找包含指定key，value，一致的子项
*/
interface Tag {
    key: string;
    value?: any;
    node?: any; // 递归查询元素
}
export const filterByKVN: (arr: any[], tag: Tag) => any[] = (arr, tag) => {
    let res: any[] = []; // 递归核心需要把结果收集器，单独放出来，内容递归
    const find = (arr: any[], tag: Tag) => {
        const { key, value, node } = tag;
        arr.forEach((item) => {
            if (item[key] === value) {
                res.push(item);
            }
            item[node] && find(item[node], tag);
        });
    };
    find(arr, tag);
    return res;
};

/* 
    移除数组中的某一项内容
*/
export function removeByKV(arr: any[], tag: Tag): any | void {
    const { key, value, node } = tag;
    const i = arr.findIndex((item) => item[key] === value);
    if (i > -1) {
        return arr.splice(i, 1);
    }
}

/* 
    根据key，value，（可递归），移除数组中的某一项内容
*/
export function removeByKVN(arr: any[], tag: Tag): any | void {
    const { key, value, node } = tag;
    arr.findIndex((item) => item[key]);
}

/* 
    寻找数组中的某一项内容
*/
export function findByKV(arr: any[], tag: Tag): any {
    const { key, value } = tag;
    const i = arr.findIndex((item) => item[key] === value);
    return i;
}

/* 
    移除数组中的某一项内容
*/
export function remove(arr: any[], item: any): any | void {
    if (arr.length) {
        const i = arr.indexOf(item);
        if (i > -1) {
            return arr.splice(i, 1);
        }
    }
}
/* 
    根据数组中某一项的key排序
*/
export function sortByK(arr: any[], key: string): void {
    if (arr.length) {
        arr.sort((a, b) => a[key] - b[key]);
    }
}
