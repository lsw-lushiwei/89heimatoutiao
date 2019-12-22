<template>
  <!-- 卡片组件 -->
  <el-card>
    <bread-crumb slot="header">
      <!-- 插槽内容 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <!-- 列组件 -->
      <el-table-column prop="title" width="600" label="标题"></el-table-column>
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <!-- {{obj.row.comment_status}} -->
          <el-button type="text" size="small">修改</el-button>
          <el-button
            type="text"
            size="small"
            @click="openOrClose(obj.row)"
          >{{obj.row.comment_status ? '关闭评论':'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <el-pagination background layout="prev, pager, next"
      :total="page.total"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      @current-change="changePage">
      </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        // 专门放置分页数据
        total: 0, // 数据总条数
        pageSize: 8, // 默认每页8条数据
        currentPage: 1 // 当前页码 默认第一页
      }
    }
  },
  methods: {
    changePage (newPage) {
      // 修改当前页码
      this.page.currentPage = newPage
      this.getComment()
    },
    getComment () {
      // axios默认是get类型
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, par_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results // 获取评论列表数据给本身data
        this.page.total = result.data.total_count // 获取文章总条数
      })
    },
    // 定义一个布尔值转化方法
    formatterBool (row, column, cellValue, index) {
      // row          当前行数据
      // column       当前列属性
      // cellValue    当前单元格的值
      // index        当前下标
      return cellValue ? '正常' : '关闭'
    },
    // 打开或者关闭
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      // 确定是进入then
      this.$confirm(`确定要${mess}吗？`).then(() => {
        // 确认用户要调用接口了
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(res => {
          // 打开评论/关闭评论之后
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getComment() // 重新获取数据
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
