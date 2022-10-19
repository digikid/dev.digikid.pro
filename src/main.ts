import { createApp } from 'vue';
import { createPinia } from 'pinia';

import i18n from '@i18n/index';
import router from '@router/index';
import yandexMetrika from '@metrika/index';

import App from './App.vue';

import './main.css';

const pinia = createPinia();

const app = createApp(App);

app.use(i18n);
app.use(pinia);
app.use(router);
app.use(yandexMetrika);

app.mount('#app');
