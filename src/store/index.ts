import { defineStore } from 'pinia';
import store from 'storejs';
export const useSystemStore = defineStore('system', {
  state: () => {
    return {
      iconList: store.get('iconList') ? JSON.parse(store.get('iconList')) : [],
    };
  },
  getters: {
    iconListInSelect(state) {
      return state.iconList.map(name => ({ label: name, value: name }));
    },
  },
  actions: {},
});
