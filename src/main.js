import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import '@/styles/app.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'element-plus/dist/index.css'
import 'bootstrap/dist/css/bootstrap.css'; // Importa el archivo CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.js'; // Importa el archivo JavaScript de Bootstrap


createApp(App)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
