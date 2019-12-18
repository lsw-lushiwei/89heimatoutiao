<template>
  <div class="login">
    <!-- 放置卡片组件 -->
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 放置登录表单 -->
      <!-- 表单容器 需要绑定model属性 rules属性绑定校验规则-->
      <el-form :model="loginForm" :rules="loginRules" ref="vessel">
        <!-- 表单域 -->
        <el-form-item prop="phone">
          <!-- 手机号输入框 -->
          <el-input v-model="loginForm.phone" class="phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码输入框 -->
        <el-form-item prop="verification">
          <el-input v-model="loginForm.verification" placeholder="请输入验证码" class="verification"></el-input>
          <el-button class="send" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="clause">
          <el-checkbox v-model="loginForm.clause">我已阅读并同意<a href="javascript:;" style="color:red">用户协议</a>和<a href="javascript:;" style="color:red">隐私条款</a></el-checkbox>
        </el-form-item>
        <el-form-item>
          <!-- 注册点击事件 -->
          <el-button @click="registerLogin" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  // 在data中定义表单数据对象
  data () {
    return {
      // 定义一个表单数据
      loginForm: {
        phone: '',
        verification: '',
        clause: false
      },
      loginRules: {
        // 验证表单输入规则
        // required:true为必填   pattern为正则表达式
        phone: [{ required: true, message: '请输入手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }],
        verification: [{ required: true, message: '请输入您的验证码' }, { pattern: /^\d{6}$/, message: '验证码为6为数字' }],
        clause: [{ validator: function (rule, value, callback) {
          // rule是当前的规则，没什么用
          // value是我们要校验的字段的值
          if (value) {
            // 如果为true则校验通过
            callback() // 通过直接执行callback方法
          } else {
            callback(new Error('请阅读并勾选用户协议和隐私条款'))
          }
        } }]
      }
    }
  },
  methods: {
    registerLogin () {
      this.$refs.vessel.validate(function (isOK) {
        if (isOK) {
          // 认为校验表单数据成功
          console.log('前端校验成功，将手机号与验证码发到后端校验')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  // scoped属性只会对当前组件样式产生作用，防止污染其他组件
  .login{
    height: 100vh; // 高度撑满屏幕
    background-image: url("../../assets/img/login_bg.jpg");
    background-size: cover; // 自适应
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
      width: 440px;
      height: 350px;
      .title{
        text-align: center;
        img{
          height: 40px;
        }
      }
      .phone{
        margin-top:30px;
      }
      .verification{
        width: 65%;
      }
      .send{
        float: right;
      }
    }
  }
</style>
