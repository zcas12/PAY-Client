<template>
  <el-container class="contents">
    <div class="prd_detail_box renew">
      <div class="left_area">
        <div class="prd_img">
          <img alt="상세 이미지" :src="product.src"/>
        </div>
      </div>
      <div class="right_area">
        <detail-prd-info :prd="product"></detail-prd-info>
      </div>
    </div>
  </el-container>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  asyncData({ query }) {
    const productId = query.productId;
    return {
      productId
    }
  },
  data() {
    return {
    }
  },
  filters:{
    comma(val){
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed:{
    ...mapGetters('product',['cosmetics']),
    product(){
      return this.$_.find(this.cosmetics,(item)=>item.code===this.productId)
    },

  },
  methods:{

  }
}
</script>
<style lang="scss" >
.prd_detail_box{
  padding: 35px 0 0;
  .left_area{
    width: 510px;
    float: left;
    margin-top: 5px;
    .prd_img{
      width: 510px;
      height: 510px;
      position: relative;
      text-align: center;
      img{
        max-width: 510px;
        max-height: 510px;
        width: auto!important;
        height: auto!important;
      }
    }
  }
  .right_area{
    width: 450px;
    float: right;

  }
}
</style>
