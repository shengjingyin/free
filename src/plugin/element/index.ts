import type { App } from 'vue';
import Element from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementIcon from '@element-plus/icons-vue';
import store from 'storejs';

export const setupElement = (app: App) => {
  app.use(Element);
  const iconList = [] as string[];
  for (const key in ElementIcon) {
    iconList.push(key);
    app.component(key, ElementIcon[key]); // 全局注册ICON
  }
  if (!store.get('iconList')) {
    store.set('iconList', JSON.stringify(iconList)); // 全局保存所有的icon 名称列表
  }
};
