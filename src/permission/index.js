// 权限拦截 导航守卫
import router from '../router/index'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  // 拦截谁？判断拦截地址
  // 由于框架升级了corejs版本，导致字符串方式编译问题
  if (to.path !== '/login') {
    // 进行权限判断，判断是否有token，如果有，则放过，如果没有，回到登录页
    let token = window.localStorage.getItem('user-token')
    if (token) {
      // 直接放过
      next()
    } else {
      // 强制跳转到登录页
      next('/login')
    }
  } else {
    // 直接放过
    next()
  }
})
