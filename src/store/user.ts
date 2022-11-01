import { defineStore } from 'pinia';
import store from 'storejs';
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      info: store.get('user') ? JSON.parse(store.get('user')) : null,
    };
  },
  actions: {
    SAVE_USER_INFO(val) {
      this.info = val;
      store.set('user', JSON.stringify(val));
    },
  },
});
