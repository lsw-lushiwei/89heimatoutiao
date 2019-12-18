import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入element-ui包
import 'element-ui/lib/theme-chalk/index.css' // 引入element-ui样式
import './styles/index.less' // 引入初始化样式
import axios from 'axios' // 引入axios

Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.proyotype.$http = axios // axios赋值给全局属性

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
