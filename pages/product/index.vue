<template>
  <el-container direction="vertical" class="contents product-box">
    <ul class="cate_prd_list">
      <li
        v-for="(prd, index) in pagedTableData"
        :key="index"
        class="flag">
          <product :prd="prd"/>
      </li>
    </ul>
    <el-pagination
      :page-size="pageSize"
      :pager-count="10"
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
    ...mapGetters('product',['cosmetics']),
    code(){
      return this.$route.query.code;
    },
    product(){
      if (this.code === 'total' || !this.code){
        return this.$_.cloneDeep(this.cosmetics);
      }else{
        return this.cosmetics.filter((val)=>{
          return val.category === this.code
        })
      }
    },
    pagedTableData() {
      return this.product.slice(this.pageSize * this.currentPage - this.pageSize, this.pageSize * this.currentPage)
    },
    total(){
      return this.product.length ? this.product.length: 0
    }
  },
  watch:{
    '$route.query.code': {
      handler: function() {
        this.currentPage = 1;
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
  justify-content: center;
  align-items: center;
}
.cate_prd_list{
  border-top: 5px solid #FFF;
  border-bottom: 1px solid #ddd;
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
