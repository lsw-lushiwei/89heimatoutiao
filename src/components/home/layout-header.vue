<template>
  <!-- 头部组件 -->
  <el-row type="flex" justify="space-between" class="layout-header" align="middle">
    <el-col :span="6" class="left">
      <i class="el-icon-s-fold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4" class="right">
      <el-row type="flex" justify="end" align="middle">
        <!-- 头像 -->
        <!-- 如果有头像时使用头像，没有头像时使用默认头像 -->
        <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt />
        <!-- 下拉菜单 -->
        <!-- 绑定方法，实现退出 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">{{userInfo.name}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="information">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">Git地址</el-dropdown-item>
            <el-dropdown-item command="quit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // 生命周期查询用户头像
  data () {
    return {
      userInfo: {}, // 用户信息
      defaultImg: require('../../assets/img/avatar.jpg') // 先把地址转换成变量，再使用三元表达式
    }
  },
  created () {
    // 获取令牌
    this.$axios({
      url: '/user/profile'
      // headers参数
    }).then(res => {
      // console.log(res.data)
      this.userInfo = res.data // 获取用户个人信息
    })
  },
  // 使用elementui注册事件，实现退出
  methods: {
    handleCommand (command) {
      if (command === 'quit') {
        // 退出并销毁令牌
        window.localStorage.removeItem('user-token') // 删除用户令牌
        this.$router.push('/login') // 编程导航
      } else if (command === 'git') {
        window.location.href = 'http://github.com/shuiruohanyu/89heimatoutiao'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  height: 60px;
  .left {
    font-size: 18px;
    .title {
      font-size: 16px;
      color: #2c3e50;
      margin-left: 10px;
    }
  }
  .right {
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }
}
</style>
