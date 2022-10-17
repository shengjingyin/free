import _ from "lodash";
export const addUniqueId = (arr: any[], prefix?: string, treeCode: string = 'children') => {
    arr.forEach((item) => {
        if (Array.isArray(item)) {
            addUniqueId(item, prefix);
        } else {
            item.id = _.uniqueId(prefix);
            if (item[treeCode]) {
                addUniqueId(item[treeCode], prefix);
            }
        }
    });
    return arr;
};