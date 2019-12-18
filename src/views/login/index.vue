<template>
  <div class="login">
    <!-- 放置卡片组件 -->
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 放置登录表单 -->
      <!-- 表单容器 -->
      <el-form>
        <!-- 表单域 -->
        <el-form-item>
          <!-- 手机号输入框 -->
          <el-input class="phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码输入框 -->
        <el-form-item>
          <el-input placeholder="请输入验证码" class="verification"></el-input>
          <el-button class="send" plain="">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox>我已阅读并同意<a href="javascript:;" style="color:red">用户协议</a>和<a href="javascript:;" style="color:red">隐私条款</a></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
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
