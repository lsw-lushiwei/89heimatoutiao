<template>
  <div class="not-found">
    <img src="../assets/img/404.gif" alt />
    <div>找不到要访问的地址</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.not-found {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    width: 800px;
    height: 450px;
  }
  div{
    font-size: 50px;
    color: pink;
    position: absolute;
    top: 100px;
  }
}
</style>
