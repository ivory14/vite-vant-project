import { createApp } from 'vue'
import './style.css'
import plugins from './plugins';
import 'lib-flexible/flexible'
import 'vant/lib/index.css'; // 全局引入样式
import App from './App.vue'
import router from './router';

const app = createApp(App);
plugins(app);
app.use(router);
app.mount('#app');
