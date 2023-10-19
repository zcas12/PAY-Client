<template>
  <header id="header">
    <div class="header-wrap">
      <h1 id="global-logo" style="background: #6f778b" class="w-250p h-50p">
        로고
      </h1>
      <div class="search_box" >
        <div class="flex align-center justify-center">
          <el-input v-model="input" class="header-input">
          </el-input>
          <i class="el-icon-search cursor-pointer"></i>
        </div>
      </div>
      <ul class="my-menu-area">
        <li>마이 메뉴</li>
        <li></li>
      </ul>
    </div>
    <div class="header-block">

    </div>
  </header>
</template>
<script>
export default {
  name:"layoutHeader",
  data(){
    return {
      input:""
    }
  }
}
</script>
<style lang="scss">
#header{
  width: 1020px;
  margin: 0 auto;
  min-width: 1020px;
  *{
    box-sizing: content-box;
    word-spacing: 0.1em;
  }
  .header-wrap {
    height: 90px;
    width: 1020px;
    background: antiquewhite;
    h1{
      float: left;
      margin-top: 20px;
    }
    .search_box{
      float: left;
      position: relative;
      width: 340px;
      height: 40px;
      margin: 22px 0 0 90px;
      padding: 0 20px 0 20px;
      border: 2px solid #FF3656;
      background: #fff;
      border-radius: 20px;
      .header-input{
        .el-input__inner{
          border: 0;
          background-color: transparent;
        }
      }

    }
    .my-menu-area{
      float: right;
      margin-top: 6px;
      background: aqua;
      li{
        float: left;
        position: relative;
        height: 65px;
        padding-top: 20px;
        width: 100px;
      }
    }

  }
  .header-block{
    position: relative;
    border-top: 1px solid #e5e5e5;
    z-index: 1
  }
}
</style>
