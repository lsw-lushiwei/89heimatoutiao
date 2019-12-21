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
        <el-button type="text" size="small">{{obj.row.comment_status ? '关闭评论':'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      // axios默认是get类型
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results // 获取评论列表数据给本身data
      })
    },
    // 定义一个布尔值转化方法
    formatterBool (row, column, cellValue, index) {
    // row          当前行数据
    // column       当前列属性
    // cellValue    当前单元格的值
    // index        当前下标
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
