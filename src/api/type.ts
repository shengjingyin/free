import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestInterceptors {
  // request
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  // response
  responseInterceptors?: (res: AxiosResponse) => AxiosResponse;
  responseInterceptorsCatch?: (err: unknown) => unknown;
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
}
export interface MyRequestConfig<T> extends RequestConfig {
  data?: T;
}

export interface MyResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface Req {
  [key: string]: unknown;
}
export interface Res {
  msg: string;
  data: unknown[];
  errorCode: number;
  request: string;
}
