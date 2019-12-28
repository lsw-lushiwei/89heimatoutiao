<template>
  <div class="layout-aside">
    <div class="title">
      <img :src="collaspse ? smallImg : bigImg" alt />
    </div>
    <!-- 设置宽度、背景颜色、字体颜色、字体激活颜色、开启路由模式 -->
    <el-menu :collapse="collaspse" :style="{width: collaspse ? '60px' : '230px'}" background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b" :router="true">
      <el-menu-item index='/home'>
        <template>
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </template>
      </el-menu-item>
      <!-- 二级导航 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-more"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index='/home/publish'>发布文章</el-menu-item>
        <el-menu-item index='/home/articles'>内容列表</el-menu-item>
        <el-menu-item index='/home/comment'>评论列表</el-menu-item>
        <el-menu-item index='/home/material'>素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index='/home/picture'>图文数据</el-menu-item>
        <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
        <el-menu-item index='/home/fanslife'>粉丝画像</el-menu-item>
        <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index='/home/account'>
        <template>
          <i class="el-icon-setting"></i>
          <span>账户信息</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  // 接收传递过来的是否折叠值
  props: ['collaspse'],
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'), // 大图
      smallImg: require('../../assets/img/toutiao.png') // 小图
    }
  }
}
</script>

<style lang="less" scoped>
.layout-aside {
  overflow: hidden;
  .el-menu{
    border-right: none;
  }
  .title {
    text-align: center;
    background-color: #2e2f32;
    padding: 10px 0;
    img {
      height: 35px;
    }
  }
}
</style>
