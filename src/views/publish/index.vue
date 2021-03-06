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
        <quill-editor style="height: 300px ; width: 900px" v-model="formData.content" type="textarea" :rows="4"></quill-editor>
      </el-form-item>
      <el-form-item prop="type" label="封面" style="margin-top: 120px">
        <el-radio-group @change="changeType" v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 放置封面组件 用到父组件给子组件传值 -->
      <cover-image @clickOneImg="receiveImg" :list='formData.cover.images'></cover-image>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
          <!-- 如果不传参数，必须要加一个括号，代表没有参数，是undefined，undefined的值为false，不加会报错，因为默认的第一个参数不是布尔值 -->
        <el-button @click="publishArticle()" type="primary">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
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
  watch: {
    // watch中的this指向实例组件
    // 解决两个路由共用一个组件进行跳转的时候  组件没有销毁
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        // 如果有参数，则修改
        this.getArticleById(to.params.articleId) // 如果有修改 重新拉取数据
      } else {
        // 没有参数，则发布
        this.formData = // 没有参数，发布
        this.formData = {
          title: '', // 标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面类型
            images: [] // 存储图片地址
          }
        }
      }
    }
    // 监控嵌套对象中的值
    // 'formData.cover.type': function () {
    //   // this指向组件实例
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     // 无图或者自动
    //     this.formData.cover.images = []
    //   } else if (this.formData.cover.type === 1) {
    //     // 单图
    //     this.formData.cover.images = ['']
    //   } else if (this.formData.cover.type === 3) {
    //     // 三图
    //     this.formData.cover.images = ['', '', '']
    //   }
    // }
  },
  methods: {
    // 接收方法
    receiveImg (img, index) {
      // 接收到数据后修改images数组 由于images是数组，根据数组的下标进行判断修改谁
      // 此时得到了地址和下标 进行修改
      // this.formData.cover.images[index] = img // 这种不可以，不符合vue的响应式数据，数据发生改变时，要可以让vue监控到
      // 将数组赋值给新数组vue就可以监控到   数组变成新数组就会触发响应式视图更新
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? img : item)
    },
    // 切换类型时触发
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        // 无图或者自动
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        // 单图
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        // 三图
        this.formData.cover.images = ['', '', '']
      }
    },
    // 获取频道
    async getChannels () {
      let res = await this.$axios({
        url: '/channels'
      })
      this.channels = res.data.channels // 获取频道数据
    },
    publishArticle (draft) {
      this.$refs.publishForm.validate(async (isOK) => {
        if (isOK) {
          let { articleId } = this.$route.params // 获取动态路由参数
          await this.$axios({
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : '/articles',
            params: { draft },
            data: this.formData
          })
          this.$router.push('/home/articles') // 回到内容列表
        }
      })
    },
    async  getArticleById (articleId) {
      let res = await this.$axios({
        url: `/articles/${articleId}`
      })
      this.formData = res.data // 将指定文章数据给data数据
    }
  },
  created () {
    this.getChannels() // 获取频道数据
    // 获取id 判断是否有id，如果有，则修改，如果没有，则发布
    let { articleId } = this.$route.params // 获取动态路由参数
    articleId && this.getArticleById(articleId) // 获取文章数据
  }
}
</script>

<style>
</style>
