<template>
  <el-container direction="vertical" class="contents product-box">
    <el-empty
      v-if="categoryProducts.length < 1"
      description="찾으시는 상품이 없습니다."
      class="is-empty"
    >
    </el-empty>
    <ul
      v-else
      class="cate_prd_list"
    >
      <li
        v-for="(prd, index) in pagedTableData"
        :key="index"
        class="flag">
          <product :prd="prd"/>
      </li>
    </ul>
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      @current-change="setPage"
    >
    </el-pagination>
  </el-container>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  async asyncData({query}){
  },
  data() {
    return {
      pageSize:8,
      currentPage:1
    }
  },
  computed:{
    ...mapGetters('product',['cosmetics','searchKeyword']),
    code(){
      return this.$route.query.code;
    },
    searchProducts(){
      /*검색어 필터*/
      if (this.searchKeyword){
        return this.cosmetics.filter((val)=>{
          return this.$_.includes(val.name, this.searchKeyword);
        })
      }else{
        return this.cosmetics;
      }
    },
    categoryProducts(){
      /*상품 종류 필터*/
      if (this.code === 'total' || !this.code){
        return this.searchProducts;
      }else{
        return this.searchProducts.filter((val)=>{
          return val.category === this.code
        })
      }
    },
    pagedTableData() {
      return this.categoryProducts.slice(this.pageSize * this.currentPage - this.pageSize, this.pageSize * this.currentPage)
    },
    total(){
      return this.categoryProducts.length ? this.categoryProducts.length: 0
    }
  },
  watch:{
    '$route.query.code': {
      handler: function() {
        this.setPage(1);
      },
      deep: true,
        immediate: true
    }
  },
  methods:{
    setPage(val){
      this.currentPage = val
    }
  }
}
</script>
<style lang="scss" scoped>

.product-box{
  justify-content: flex-start;
  align-items: center;
  .is-empty{
    min-height: 650px;
  }
}
.cate_prd_list{
  border-top: 5px solid #FFF;
  border-bottom: 1px solid #ddd;
  min-height: 650px;
  li{
    position: relative;
    float: left;
    width: 255px;
    padding: 20px 20px 20px;

  }
  .flag{

  }
}
</style>
