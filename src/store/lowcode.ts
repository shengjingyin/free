import { defineStore } from 'pinia';
import { initPage } from '@/config/lowcode';

export const useLowcodeStore = defineStore('lowcode', {
  state: () => ({
    data: initPage, // 仪表盘内所有组件集合
    select: {} as Comp, // 当前选中的组件
  }),
  getters: {},
  actions: {
    SET_CUR_SELECT(val) {
      this.select = val;
    },
    SET_DATA_LIST(val, index: number, type: 'add' | 'delete') {
      this.data.list.splice(index, 1, val);
      if (type === 'add') {
        this.SET_CUR_SELECT(val);
      }
    },
  },
});
