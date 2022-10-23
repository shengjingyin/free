import Request from './axios';
import type { MyRequestConfig, MyResponse, Req, Res } from './type';

const http = new Request({
  baseURL: 'http://127.0.0.1:3001',
  timeout: 2 * 60 * 1000,
  interceptors: {
    requestInterceptors: config => {
      console.log('实例请求拦截器', config);
      return config;
    },
    responseInterceptors: err => {
      console.log('实例响应拦截器');
      return err;
    },
  },
});

const myRequest = <D, T = any>(config: MyRequestConfig<D>) => {
  const { method = 'GET' } = config;
  if (['GET', 'get'].includes(method)) {
    config.params = config.data;
  }
  return http.request<MyResponse<T>>(config);
};

export default myRequest;
