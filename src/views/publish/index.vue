<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left: 50px" label-width="100px">
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <el-input v-model="formData.content" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="封面">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publishArticle" type="primary">发布</el-button>
        <el-button @click="publishArticle">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 定义一个channels接收频道
      formData: {
        title: '', // 标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型
          images: [] // 存储的图片地址
        },
        channel_id: null // 频道id
      },
      // 校验规则对象
      publishRules: {
        title: [{ required: true, message: '标题不能为空' }, {
          min: 5, max: 30, message: '标题需要5-30个字符'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
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
    },
    publishArticle () {
      this.$refs.publishForm.validate(function (isOK) {
        if (isOK) {
          // 进入到这一步可以调用接口了
          console.log('成功')
        }
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
