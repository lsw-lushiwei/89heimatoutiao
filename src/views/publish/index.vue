<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form style="margin-left: 50px" label-width="100px">
      <el-form-item label="标题">
        <el-input style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio>单图</el-radio>
        <el-radio>三图</el-radio>
        <el-radio>无图</el-radio>
        <el-radio>自动</el-radio>
      </el-form-item>
      <el-form-item label="频道">
        <el-select>
          <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [] // 定义一个channels接收频道
    }
  },
  methods: {
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels // 获取频道数据
      })
    }
  },
  created () {
    this.getChannels() // 获取频道数据
  }
}
</script>

<style>
</style>
