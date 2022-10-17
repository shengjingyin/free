import { createApp } from 'vue';
import App from './App.vue';
// import router, { setupRouter } from './router';

import { createPinia } from 'pinia';

import install from './install';

const app = createApp(App);

app.use(createPinia()).use(install).mount('#app');
