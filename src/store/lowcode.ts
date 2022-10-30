import { defineStore } from 'pinia';
import { initPage } from '@/config/lowcode';
import conf from '@/component/config';
import { cloneDeep } from 'lodash';
import store from 'storejs';
import { findEleByKY } from '@/shared/tree/index';

function parseEvent(node) {
  const tree = {
    label: node.name + node.model,
    value: node.model,
    children: [] as Comp[],
    actions: [] as Action[],
  };
  _parseEvent(node, tree);
  return [tree];
}
function _parseEvent(node, parent) {
  const { children } = node;
  if (children && children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      const item = children[i];
      const info = {
        label: item.name + item.model,
        value: item.model,
        children: [] as Comp[],
        actions: [],
      };
      parent.children.push(info);
      _parseEvent(item, info);
    }
  }
  if (node.component) {
    const defAction = conf[node.component].action.eventList;
    parent.children = [...cloneDeep(parent.children), ...cloneDeep(defAction)];
  }
}
// 触发其他组件的动作
function parseAction(root) {
  const tree = {
    label: root.name + root.model,
    value: root.model,
    children: [] as Comp[],
  };
  _parseAction(root, tree);
  return [tree];
}
function _parseAction(node, parent) {
  const { children } = node;
  if (children && children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      const item = children[i];
      const info = {
        label: item.name + item.model,
        value: item.model,
        children: item.actions.map(ac => ({ label: ac.name, value: ac.name })),
      };
      // 如果当前有动作，则推送到父元素中
      if (item.actions.length > 0) {
        parent.children.push(info);
      }
      _parseAction(item, info);
    }
  }
}
function parseModel(root) {
  const tree = {
    label: root.name + root.model,
    value: root.model,
    children: [] as Comp[],
  };
  _parseModel(root, tree);
  return [tree];
}
function _parseModel(root, tree) {
  const { children } = root;
  if (children && children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      const item = children[i];
      const info = {
        label: `${item.name}(${item.model})`,
        value: item.model,
        children: [],
      };
      tree.children.push(info);
      _parseAction(item, info);
    }
  }
}
export const useLowcodeStore = defineStore('lowcode', {
  state: () => ({
    data: store.get('data') ? JSON.parse(store.get('data')) : initPage, // 仪表盘内所有组件集合
    // select: {} as Comp, // 当前选中的组件
    selectId: '', // 当前选中的组件的id （i）
    idMap: store.get('idMap') ? JSON.parse(store.get('idMap')) : { total: 0 }, // 维护一个所有组件对应的id结合
  }),
  getters: {
    // 解析事件树
    eventOption(state) {
      return parseEvent(state.data);
    },
    // 解析动作树，执行对应的动作
    actionOption(state) {
      return parseAction(state.data);
    },
    // 解析数据树
    modelMap(state) {
      return parseModel(state.data);
    },
    // 当前选中元素
    select(state) {
      // 优先查找目标元素，找不到就返回页面
      const target =
        findEleByKY(state.data, { key: 'i', value: state.selectId }) ||
        findEleByKY(state.data, { key: 'i', value: '0' });
      return target;
    },
  },
  actions: {
    SET_CUR_SELECT(i: string) {
      this.selectId = i;
    },
  },
});

/* 
1、获取整棵树；能够根据指定参数，获取附带这个参数的整棵树
2、更新请求体时，需要同步设置
*/
