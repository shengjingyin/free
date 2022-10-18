import type { App } from 'vue';
import Element from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementIcon from '@element-plus/icons-vue';

export const setupElement = (app: App) => {
  app.use(Element);
  for (const key in ElementIcon) {
    app.component(key, ElementIcon[key]); // 全局注册ICON
  }
};
