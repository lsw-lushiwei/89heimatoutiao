import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Login from '../views/login/index.vue'
import Home2 from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [{
  // 强制跳转到主页
  path: '/',
  redirect: '/home'
}, {
  // 主页
  path: '/home',
  name: 'home',
  component: Home,
  children: [{
    path: '',
    component: Home2
  }, {
    // 二级路由表
    path: '/home/comment',
    component: () => import('../views/comment')
  }, {
    path: 'material',
    component: () => import('../views/material')
  }, {
    path: 'articles',
    component: () => import('../views/articles')
  },
  {
    path: 'publish', // 此规则只匹配新增文章
    component: () => import('../views/publish')
  }, {
    path: 'publish/:articleId', // 定义一个动态路由参数,此规则只匹配修改文章
    component: () => import('../views/publish')
  }]
}, {
  // 登录页
  path: '/login',
  component: Login
}
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
