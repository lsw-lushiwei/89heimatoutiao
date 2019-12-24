<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-row class="serachTool">
      <el-col :span="2">
        <span>文章状态</span>
      </el-col>
      <el-col :span="18">
        <!-- 单选框 -->
        <el-radio-group v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="serachTool">
      <el-col :span="2">
        <span>频道列表</span>
      </el-col>
      <el-col :span="18">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="serachTool">
      <el-col :span="2">
        <span>时间选择</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
          v-model="formData.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="total">
      <span>共找到10000条符合条件的内容</span>
    </el-row>
    <el-row
      v-for="item in list"
      :key="item.id.toString()"
      class="article-item"
      type="flex"
      justify="space-between"
    >
      <el-col :span="14">
        <!-- 左侧 -->
        <el-row type="flex">
          <img :src="item.cover.images.length ? item.cover.images[0] : deteRange" alt />
          <div class="info">
            <span>{{item.title}}</span>
            <el-tag type="item.status | filterType" class="tag">{{item.status | filterStatus}}</el-tag>
            <span class="data">{{item.pubdate}}</span>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6">
        <!-- 右侧 -->
        <el-row type="flex" justify="end" class="right">
          <span>
            <i class="el-icon-edit"></i>修改
          </span>
          <span>
            <i class="el-icon-delete"></i>删除
          </span>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5, // 默认选中全部
        channel_id: null, // 默认为空
        dateRange: []
      },
      channels: [], // 定义一个channels接收频道
      list: [], // 用来接收文章列表数据
      deteRange: require('../../assets/img/timg.gif')
    }
  },
  filters: {
    // 处理显示状态
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发布'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 获取文章列表数据
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(res => {
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getChannels() // 调用获取频道数据
    this.getArticles() // 调用获取文章列表
  }
}
</script>

<style lang="less" scoped>
.articles {
  .serachTool {
    height: 60px;
    padding-left: 50px;
  }
  .total {
    height: 40px;
    margin-bottom: 10px;
    margin-top: 10px;
    border-bottom: 1px dashed #ccc;
  }
  .article-item {
    margin: 20px 0;
    padding: 10px 0;
    border-bottom: 1px solid #f2f3f5;
    img {
      width: 160px;
      height: 100px;
      margin-right: 10px;
      border-radius: 5px;
    }
    .info {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .tag {
        max-width: 60px;
      }
      .data {
        color: #999;
        font-size: 12px;
      }
    }
    .right {
      span {
        margin-left: 15px;
        font-size: 12px;
      }
    }
  }
}
</style>
