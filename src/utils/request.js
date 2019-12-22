// 对axios进行一个封装
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 执行请求ok
  // config是axios的所有配置
  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers.Authorization = `Bearer ${token}` // 统一诸注入token
  return config // 返回的config 就会作为新的请求选项去进行请求
}, function () {
  // 执行请求失败
})
// 响应拦截
axios.interceptors.response.use(function (response) {
  // 成功时执行
  return response.data ? response.data : {} // 解决当data不存在时，then中读取数据报错问题
}, function (error) {
  // 失败时执行 状态码不是200/201/204
  let status = error.response.status // 获取状态码，根据状态码进行提示
  // let configurl = error.request.url
  let message = '' // 提示信息
  switch (status) {
    case 400:
      message = '手机号或验证码错误'
      break
    case 401:
      // token过期，强制跳转到登录页面，并删除token令牌
      window.localStorage.removeItem('user-token')
      router.push('/login')
      break
    case 403:
      // 如果是同样的状态码，但是不同意思，需要通过请求地址来判断是哪个响应
      // resfehtoken过期，强制跳转到登录页面 resfehtoken是用来换取token的，并删除token令牌
      window.localStorage.removeItem('user-token')
      router.push('/login')
      break
    case 507:
      message = '服务器数据异常'
      break
    case 404:
      message = '手机号不正确'
      break
  }
  // 状态码提示
  Message({ type: 'warning', message })
  // 想让错误拦截器的内容继续进入到以后的catch中，而不是then
  return Promise.reject(error)
})
export default axios
