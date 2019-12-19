<template>
  <!-- 放置一个外层容器 -->
  <el-container>
    <!-- 左右布局 -->
    <el-aside style="background-color:#353b4e;height:100vh;width:230px">
      <!-- 左侧导航 -->
      <layou-aside></layou-aside>
    </el-aside>
    <!-- 再放一个container -->
    <el-container>
      <!-- 上下布局 -->
      <el-header>
        <!-- 头部组件 -->
        <layout-header></layout-header>
      </el-header>
      <!-- 主要区域 -->
      <el-main>主要区域</el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    'layou-aside': layoutAside,
    'layout-header': layoutHeader
  }
}
</script>

<style>
</style>
