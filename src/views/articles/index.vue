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
        <el-radio-group v-model="formData.status" @click="changeCondition">
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
        <el-select v-model="formData.channel_id" @change="changeCondition">
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
          @change="changeCondition"
          value-format="yyyy-MM-dd"
          v-model="formData.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="total">
      <span>共找到{{page.total}}条符合条件的内容</span>
    </el-row>
    <el-row
      v-for="item in list"
      :key="item.id.toString()"
      class="article-item"
      type="flex"
      justify="space-between"
    >
      <el-col :span="12">
        <!-- 左侧 -->
        <el-row type="flex">
          <img :src="item.cover.images.length ? item.cover.images[0] : deteRange" alt />
          <div class="info">
            <span style="max-width:35em">{{item.title}}</span>
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
          <span @click="delArticle(item.id)">
            <i class="el-icon-delete"></i>删除
          </span>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination background layout="prev, pager, next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize" @current-change="changePage">
        </el-pagination>
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
      deteRange: require('../../assets/img/timg.gif'),
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页数据要求最低10条
        total: 0
      }
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
    // 注册删除事件
    delArticle (id) {
      // 当前已发布的文章是无法删除的，只有类型是草稿的文章可以删除
      this.$confirm('确定删除?').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}` // 大数据类型，转换成字符串类型
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getConditionArticle() // 重新刷新调取数据
        })
      })
    },
    // 改变页码事件
    changePage (newPage) {
      // 赋值当前页码
      this.page.currentPage = newPage // 赋值当前页
      this.getConditionArticle()
    },
    // 改变筛选条件
    changeCondition () {
      this.page.currentPage = 1 // 强制将当前页码回到第一页
      this.getConditionArticle()
    },
    // 封装方法，改变页码事件与改变筛选条件代码大部分重复
    // 搜索与分页放到一起
    getConditionArticle () {
      let params = {
        page: this.page.currentPage, // 分页信息
        per_page: this.page.pageSize, // 分页信息
        status: this.formData.status === 5 ? null : this.formData.status, // 不传参数为全部 5代表全部   最新参数
        channel_id: this.formData.channel_id, // 频道
        begin_pubdate: this.formData.dateRange.length ? this.formData.dateRange[0] : null, // 起止时间
        end_pubdate: this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null // 截止时间
      }
      this.getArticles(params) // 调用获取文章数据
    },
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 获取文章列表数据
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.list = res.data.results // 接收文章列表数据
        this.page.total = res.data.total_count // 文章总数
      })
    }
  },
  created () {
    this.getChannels() // 调用获取频道数据
    this.getArticles({ page: 1, per_page: 10 }) // 调用获取文章列表 第一次默认第一页，十条数据
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
        cursor: pointer;
      }
    }
  }
}
</style>
