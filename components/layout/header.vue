<template>
  <header id="header">
    <div class="header-wrap">
      <h1 id="global-logo" class="w-250p h-50p">
        <nuxt-link to="/product">
          <el-image
            :src="logo"
            fit="cover"
          >
          </el-image>
        </nuxt-link>
      </h1>
      <div class="search_box" >
        <div class="flex align-center justify-center">
          <el-input
            v-model="searchInput"
            class="header-input"
            @keyup.native.enter="search()"
          >
          </el-input>
          <button id="searchSubmit" @click="search()">
            <i class="el-icon-search"></i>
          </button>
        </div>
      </div>
      <ul class="my-menu-area">
        <li><nuxt-link to="/order/cart">장바구니</nuxt-link></li>

      </ul>
    </div>
    <div class="header-block">

    </div>
  </header>
</template>
<script>
import Logo from '@/static/kcp-logo.svg';
import {mapMutations} from "vuex";
export default {
  name:"layoutHeader",
  data(){
    return {
      searchInput:"",
      logo: Logo
    }
  },
  methods:{
    ...mapMutations('product',['setKeyword']),
    search(){
      this.setKeyword(this.searchInput);
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
    background: transparent;
    h1{
      float: left;
      margin-top: 30px;
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
          padding: 0 0 0 15px;
          width: 90% !important;
        }
      }
      #searchSubmit{
        position: absolute;
        top: 7px;
        right: 18px;
        width: 23px;
        height: 23px;
        text-align: center;
        border: 0;
        background-color: transparent;
        i{
          color: #868e96;
          font-size: 1.8em;
        }
      }
    }
    .my-menu-area{
      float: right;
      margin-top: 6px;
      background: transparent;
      li{
        float: left;
        text-align: center;
        position: relative;
        height: 65px;
        padding-top: 20px;
        width: 100px;
      }
      li:before {
        content: "";
        display: block;
        position: absolute;
        top: 22px;
        right: 0;
        width: 1px;
        height: 18px;
        background: #d6d6d6;
      }
    }

  }
  .header-block{
    /*position: relative;
    border-top: 1px solid #e5e5e5;
    z-index: 1*/
  }
}
</style>
