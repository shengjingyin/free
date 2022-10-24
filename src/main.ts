import './styles/mixin.less';
import './styles/lowcode.less';
import { createApp } from 'vue';
import App from './App.vue';
// import router, { setupRouter } from './router';

import { createPinia } from 'pinia';

import install from './install';

const app = createApp(App);

if (process.env.NODE_ENV !== 'production') {
  window.onload = function () {
    setTimeout(function () {
      console.group(`%c 性能参数：`, 'background:#286fb9;color:white;');
      const {
        domainLookupEnd,
        domainLookupStart,
        connectEnd,
        connectStart,
        responseEnd,
        navigationStart,
        domComplete,
        loadEventEnd,
        requestStart,
        domLoading,
      } = window.performance.timing;
      console.log('DNS查询耗时 ：' + (domainLookupEnd - domainLookupStart).toFixed(0));
      console.log('TCP链接耗时 ：' + (connectEnd - connectStart).toFixed(0));
      console.log('请求耗时【响应结束 - 请求开始】 ：' + (responseEnd - requestStart).toFixed(0));
      console.log(
        '白屏时间 【网页 DOM 结构开始解析时 - 卸载前一个文档结束之时】：' +
          (domLoading - navigationStart).toFixed(0)
      );
      console.log(
        'dom渲染时长【文档解析完成 - 卸载前一个文档结束之时】 ：' +
          (domComplete - navigationStart).toFixed(0)
      );
      console.log(
        '加载耗时时间 【load事件结束 - 卸载前一个文档结束之时】：' +
          (loadEventEnd - navigationStart).toFixed(0)
      );
      const t = performance.memory;
      if (t) {
        console.log(
          'js内存使用占比 ：' + ((t.usedJSHeapSize / t.totalJSHeapSize) * 100).toFixed(2) + '%'
        );
      }
      console.groupEnd();
    });
  };
}

app.use(createPinia()).use(install).mount('#app');
