<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- 头像组件 -->
    <el-upload :http-request="uploadImg" class="head-upload" action="" :show-file-list="false">
      <img :src="formData.photo ? formData.photo : defaultImg" alt="">
    </el-upload>
    <!-- 放置组件 -->
    <el-form ref="myForm" :model="formData" :rules="rules" style="margin-left: 50px" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="formData.name" style="width: 30%"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="formData.intro"  style="width: 30%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email"  style="width: 30%"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formData.mobile"  disabled="" style="width: 30%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="seveUserInfo">保存信息</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus' // 引入公共的实例
export default {
  data () {
    return {
      // 定义一个表单数据对象
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1,
          max: 7,
          message: '用户名的长度限制为1到7个字符'
        }],
        email: [{ required: true, message: '邮箱不能为空' },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确'
          }]
      }, // 定义一个规则
      defaultImg: require('../../assets/img/avatar.jpg') // 如果没有头像则使用默认头像
    }
  },
  methods: {
    // 上传头像
    async uploadImg (params) {
      let data = new FormData() // 实例化一个对象
      data.append('photo', params.file) // 加入参数
      let res = await this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      })
      this.formData.photo = res.data.photo
      eventBus.$emit('updateUserInfoSuccess') //
    },
    // 获取用户信息
    async getUserInfo () {
      let res = await this.$axios({
        url: '/user/profile'
      })
      this.formData = res.data
    },
    // 保存时校验表单数据是否ok
    async  seveUserInfo () {
      await this.$refs.myForm.validate(async (isOK) => {
        // 调用保存方法
        if (isOK) {
          // 如果可以则调用接口
          await this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          })
          // 进入到这里代表成功
          // 提示即可，无需跳转
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          // 此时需要告诉头部组件 更新成功了 你也更新
          eventBus.$emit('updateUserInfoSuccess') // 触发一盒自定义事件
        }
      })
    }
  },
  created () {
    this.getUserInfo() // 获取用户信息
  }
}
</script>

<style lang='less' scoped>
.head-upload{
  position: absolute;
  right: 300px;
  img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
}
</style>
