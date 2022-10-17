import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface RequestInterceptors {
    // request
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestInterceptorsCatch?: (err: any) => any;
    // response
    responseInterceptors?: (res: AxiosResponse) => AxiosResponse;
    responseInterceptorsCatch?: (err: any) => any;
}

export interface RequestConfig extends AxiosRequestConfig {
    interceptors?: RequestInterceptors;
}
