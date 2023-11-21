import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import {i18n} from './i18n'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'element-plus/dist/index.css'
import 'bootstrap/dist/css/bootstrap.css'; // Importa el archivo CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.js';
import '@/styles/app.css'

createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(i18n)
    .use(store)
    .mount('#app')
