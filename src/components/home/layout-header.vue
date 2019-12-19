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
        <img src="../../assets/img/avatar.jpg" alt />
        <!-- 下拉菜单 -->
        <el-dropdown>
          <span class="el-dropdown-link">下拉菜单</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>Git地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {}
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
