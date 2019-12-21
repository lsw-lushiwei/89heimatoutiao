<template>
  <el-breadcrimb>
    <el-breadcrimb-item to="/home">首页</el-breadcrimb-item>
    <el-breadcrimb-item>
        <!-- 具名插槽 -->
        <slot name='title'></slot>
    </el-breadcrimb-item>
  </el-breadcrimb>
</template>

<script>
export default {}
</script>

<style>
</style>
