import Request from './axios';
import type { MyRequestConfig, MyResponse, Req, Res } from './type';
import { ElMessage } from 'element-plus';
const http = new Request({
  baseURL: 'http://127.0.0.1:3001',
  timeout: 2 * 60 * 1000,
  interceptors: {
    requestInterceptors: config => {
      console.log('实例请求拦截器', config);
      return config;
    },
    responseInterceptors: response => {
      console.log('实例响应拦截器', response);
      const {
        config: { silence },
        status,
      } = response;
      if (!silence && status !== 200) {
        // 一般服务器捕获的问题点都会以200正常返回，所以这里一定是服务器异常，要报错
        ElMessage({
          message: response.message,
          type: 'error',
        });
      }
      if (status === 200) {
        return response.data;
      }
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
