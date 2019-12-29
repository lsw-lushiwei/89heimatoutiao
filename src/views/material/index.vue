<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-row type="flex" justify="end">
      <el-upload :http-request="uploadImg" :show-file-list="false" action="1">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <!-- 素材 -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i
                @click="collectOrCancel(item)"
                :style="{color:item.is_collected ? 'red' : ''}"
                class="el-icon-star-on"
              ></i>
              <i @click="delMaterial(item.id)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center" style="height: 80px">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type="flex" justify="center" style="height: 80px">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'all', // 默认选中全部
      list: [], // 接收全部数据
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    // 定义一个删除方法
    async  delMaterial (id) {
      await this.$confirm('确定删除？')
      // 调用删除接口
      await this.$axios({
        url: `/user/images/${id}`,
        method: 'delete'
      })
      // 重新加载数据
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.getAllMaterial()
    },
    // 收藏或者取消收藏
    async  collectOrCancel (row) {
      await this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: {
          collect: !row.is_collected // 如果是收藏则变成取消，如果是取消则变成收藏
        }
      })
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.getAllMaterial() // 调用重新加载
    },
    // 上传图片
    async   uploadImg (params) {
      this.loding = true
      let form = new FormData()
      form.append('image', params.file) // 添加文件到FormData
      await this.$axios({
        method: 'post',
        url: '/user/images',
        data: form // formdata数据
      })
      // 说明已经上传成功了一张图片
      this.loding = true
      this.getAllMaterial()
    },
    // 切换分页
    changePage (newPage) {
      this.page.currentPage = newPage // 得到最新页码
      this.getAllMaterial()
    },
    changeTab () {
      // 应该吧当前页码回到第一页
      this.page.currentPage = 1
      this.getAllMaterial()
    },
    // 获取所有的素材/收藏
    async  getAllMaterial () {
      let res = await this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      })
      this.list = res.data.results
      this.page.total = res.data.total_count // 获取总条数
    }
  },
  created () {
    this.getAllMaterial() // 获取所有素材
  }
}
</script>

<style lang="less" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 240px;
    margin: 20px 50px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      width: 100%;
      font-size: 20px;
      position: absolute;
      bottom: 0;
      background-color: #f4f5f6;
      height: 30px;
      margin-left: -20px;
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
