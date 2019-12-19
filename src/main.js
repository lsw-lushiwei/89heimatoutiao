import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入element-ui包
import 'element-ui/lib/theme-chalk/index.css' // 引入element-ui样式
import './styles/index.less' // 引入初始化样式
import axios from 'axios' // 引入axios包
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值默认地址
Vue.prototype.$axios = axios // 赋值给全局对象

Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
