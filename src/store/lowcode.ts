import { defineStore } from 'pinia';
import { initPage } from '@/config/lowcode';
import conf from '@/component/config';
import { cloneDeep } from 'lodash';

function parseEvent(node) {
  const tree = {
    label: node.name + node.model,
    value: node.model,
    children: [] as any[],
    actions: [],
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
        children: [] as any[],
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
    children: [] as any[],
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
      if (item.actions.length > 0) {
        parent.children.push(info);
      }
      _parseAction(item, info);
    }
  }
}
export const useLowcodeStore = defineStore('lowcode', {
  state: () => ({
    data: initPage, // 仪表盘内所有组件集合
    select: {} as Comp, // 当前选中的组件
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
  },
  actions: {
    SET_CUR_SELECT(val) {
      this.select = val;
    },
    SET_DATA_LIST(val, index: number, type: 'add' | 'delete') {
      const newComp = cloneDeep(val);
      this.data.children.splice(index, 1, newComp);
      if (type === 'add') {
        this.SET_CUR_SELECT(newComp);
      }
    },
  },
});
