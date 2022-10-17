import Request from "./axios";
import type { RequestConfig } from "./type";

interface MyRequestConfig<T> extends RequestConfig {
    data?: T;
}

interface MyResponse<T> {
    code: number;
    message: string;
    data: T;
}

export interface Req {
    [key: string]: any;
}
export interface Res {
    msg: string;
    data: any[];
    errorCode: number;
    request: string;
}

const request = new Request({
    baseURL: "127.0.0.1:3000",
    timeout: 2 * 60 * 1000,
    interceptors: {
        requestInterceptors: (config) => {
            console.log("实例请求拦截器");
            return config;
        },
        responseInterceptors: (err) => {
            console.log("实例响应拦截器");
            return err;
        },
    },
});

const myRequest = <D, T = any>(config: MyRequestConfig<D>) => {
    const { method = "GET" } = config;
    if (["GET", "get"].includes(method)) {
        config.params = config.data;
    }
    return request.request<MyResponse<T>>(config);
};

export default myRequest;
