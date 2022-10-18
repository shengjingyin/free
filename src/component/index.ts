import { App, defineAsyncComponent } from 'vue';
import FreeButton from '';

const components = import.meta.glob('./**/*.vue'); // 异步方式
// 自动注册当前页组件
export const setupGlobComponent = (app: App) => {
  // 读取当前文件目录、遍历
  for (const [path, value] of Object.entries(components)) {
    const match = path.match(/.*\/(.*)\/index.vue$/);
    if (match && match[1]) {
      const name = `Free${match[1]}`; // 命名规则 Free + 文件夹名称
      app.component(name, defineAsyncComponent(value)); // 需要使用 defineAsyncComponent 包裹才能异步导入
    }
  }
};
