<template>
  <!-- 放置一个外层容器 -->
  <el-container>
    <!-- 左右布局 -->
    <el-aside :style="{width: collaspse ? '60px' : '231px'}" style="transition: all 0.3s; background-color:#353b4e;height:100;min-height: 100vh">
      <!-- 左侧导航 -->
      <layout-aside :collaspse='collaspse'></layout-aside>
    </el-aside>
    <!-- 再放一个container -->
    <el-container>
      <!-- 上下布局 -->
      <el-header>
        <!-- 头部组件 -->
        <layout-header></layout-header>
      </el-header>
      <!-- 主要区域 -->
      <el-main>
        <!-- 放置二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collaspse: false
    }
  },
  components: {},
  created () {
    // 开启监听
    eventBus.$on('changeCollapse', () => {
      this.collaspse = !this.collaspse
    })
  }
}
</script>

<style>
</style>
