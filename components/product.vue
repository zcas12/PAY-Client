<template>
  <div class="prd_info">
    <div class="prd_thumb goodsList" @click="prdDetail(prd)">
      <img alt="제품 사진" :src="prd.src"/>
    </div>
    <!--브랜드 & 상품 명-->
    <div class="prd_name" @click="prdDetail(prd)">
      <span class="tx_brand">
        {{ prd.brand }}
      </span>
      <p class="px_name">
        {{ prd.name  }}
      </p>
    </div>
    <!--상품 금액-->
    <p class="prd_price">
      <span class="tx_cur">
        <span class="tx_num">{{prd.price | comma}}</span>
        원
      </span>
    </p>
  </div>
</template>
<script lang="js">
export default {
  props:{
    prd: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {

    }
  },
  watch:{
  },
  filters:{
    comma(val){
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods:{
    prdDetail(prd){
      if (prd.id && prd.code){
        this.$router.push({ name: 'detail', query: {productId: prd.code} })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.prd_info{
  text-align: center;
  font-size: 14px;
  .prd_thumb{
    position: relative;
    display: block;
    width: 215px;
    height: 215px;
    background: #fff;
    cursor: pointer;
    img{
      width: auto!important;
      max-width: 215px;
      height: auto!important;
      max-height: 215px;
    }
  }
  .prd_name{
    display: block;
    min-height: 40px;
    margin: 15px 0 0 0;
    text-decoration: none;
    cursor: pointer;
    .tx_brand{
      display: block;
      height: 20px;
      line-height: 20px;
      color: #777;
      font-weight: 700;
    }
    .tx_name{
      overflow: hidden;
      height: 40px;
      padding: 2px 0;
      -webkit-box-orient: vertical;
      line-height: 18px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      word-break: keep-all;
      color: #000;
      font-size: 14px;
      text-align: center;
    }
  }
  .prd_price{
    height: 20px;
    line-height: 22px;
    .tx_cur{
      vertical-align: bottom;
      display: inline-block;
      color: #e02020;
      font-weight: 700;
    }
  }
}
</style>
