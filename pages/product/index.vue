<template>
  <el-container class="contents">
    <ul class="cate_prd_list">
      <li
        v-for="(prd, index) in cosmetics"
        :key="index"
        class="flag">
          <product :prd="prd"/>
      </li>
    </ul>
  </el-container>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  async asyncData({query}){
  },
  computed:{
    ...mapGetters('product',['cosmetics']),
    code(){
      return this.$route.query.code;
    },
  },
}
</script>
<style lang="scss" scoped>
.cate_prd_list{
  border-top: 5px solid #FFF;
  border-bottom: 1px solid #ddd;
  li{
    position: relative;
    float: left;
    width: 255px;
    padding: 30px 20px 35px;

  }
  .flag{

  }
}
</style>
