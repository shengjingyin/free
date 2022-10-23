import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestConfig, RequestInterceptors } from './type';
class Request {
  instance: AxiosInstance;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        console.log('全局请求拦截器成功处理');
        return config;
      },
      (err: any) => {
        console.log('全局请求拦截器错误处理', err);
      }
    );

    // 实例请求拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptors,
      config.interceptors?.requestInterceptorsCatch
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log('全局响应拦截器成功处理');
        return res;
      },
      (err: any) => {
        console.log('全局响应拦截器错误处理');
        return err;
      }
    );

    // 实例响应拦截器
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptors,
      config.interceptors?.responseInterceptorsCatch
    );
  }
  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 处理请求拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      this.instance
        .request<any, T>(config)
        .then(res => {
          // 处理响应拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res);
          }
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default Request;
