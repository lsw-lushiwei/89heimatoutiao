// 权限拦截 导航守卫
import router from '../router/index'
import progress from 'nprogress'
import 'nprogress/nprogress.css'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  // 开启进度条
  progress.start()
  // 拦截谁？判断拦截地址
  // 由于框架升级了corejs版本，导致字符串方式编译问题
  if (to.path.startsWith('/home')) {
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
// 关闭进度条
router.afterEach(function () {
  progress.done()
})
