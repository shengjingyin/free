export const entries = (obj: any, cb: Function) => {
    Object.entries(obj).forEach(([key, val]) => {
        cb(key, val);
    });
};
