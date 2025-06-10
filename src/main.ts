import './styles/main.less'

import { createApp } from 'vue'
import 'amfe-flexible'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
// 引入国际化
import { i18n } from './lang/index'
import { configureCompat } from '@vue/compat';
configureCompat({ MODE: 'Vue2' });
const app = createApp(App);
/* globalProperties一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。 */
// app.config.globalProperties.$i18n = i18n; 


app.use(i18n)  // 挂载i18n
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
