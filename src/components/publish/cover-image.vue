<template>
  <div class="cover-image">
    <!-- 根据封面的images长度 进行渲染 一个或者三个或者不渲染 -->
    <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-item">
        <img :src="item ? item : defaultImg" alt="">
    </div>
    <!-- 元素默认生成在body上 -->
    <el-dialog :visible="dialogVisible" @close="closeDialog">
      <!-- 放置选择素材的组件 -->
      <!-- 监听谁的事件，就在谁的标签上写监听 -->
      <select-image @selectOneImg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收属性
  data () {
    return {
      dialogVisible: false, // 控制弹层打开/关闭的变量
      defaultImg: require('../../assets/img/pic_bg.png'), // 将图片变成变量
      selectIndex: -1 // 定义一个变量接收index
    }
  },
  methods: {
    // 接收方法
    receiveImg (img) {
      // props是只读的，不可修改的属性
      // 接受到数据后，发现数据是props，想要修改，需要再次传递
      this.$emit('clickOneImg', img, this.selectIndex) // 再次触发自定义事件
      // 数据已经传出去，调用方法关闭弹层
      this.closeDialog()
    },
    openDialog (index) {
      // 打开弹层
      this.selectIndex = index // 记住点击的下标
      this.dialogVisible = true
    },
    closeDialog () {
      // 关闭弹层
      this.dialogVisible = false
    }
  }
}
</script>

<style lang ='less' scoped>
.cover-image {
  display: flex;
  margin: 20px 0;
  margin-left: 100px;
  .cover-item {
      border: 1px solid #ccc;
      width: 200px;
      height: 200px;
      img{
          height: 100%;
          width: 100%;
      }
  }
}
</style>
