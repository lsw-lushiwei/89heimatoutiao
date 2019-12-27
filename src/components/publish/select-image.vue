<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
        <div class="select-img-list">
            <el-card class="img-card" v-for='item in list' :key="item.id">
                <!-- 点击图片时，调用方法，将图片传出去 -->
                <img @click="clickImg(item.url)" :src="item.url" alt="">
            </el-card>
        </div>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center">
            <el-pagination background layout='prev,pager,next' :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize" @current-change="changePage"></el-pagination>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upliad">上传图片</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选中素材库
      list: [], // 接收素材库数据
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    // 点击图片时触发
    clickImg (url) {
      // 需要将url地址传出去  $emit()  自定义事件 可以携带参数
      this.$emit('selectOneImg', url) // $emit("事件名称",携带参数)
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    // 获取所有素材
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 获取全部数据
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count // 赋值总数
      })
    }
  },
  created () {
    this.getAllImg() // 获取所有素材
  }
}
</script>

<style lang='less' scoped>
.select-img-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card{
        width: 120px;
        height: 120px;
        margin: 10px 20px;
        img{
            width: 100%;
        }
    }
}
</style>
