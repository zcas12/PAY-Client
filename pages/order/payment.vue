<template>
  <div>
    <el-table
      :data="orderList"
      height="450"
    >
      <div slot="empty">
        장바구니에 저장된 상품이 없습니다.
      </div>
      <el-table-column
        prop="name"
        label="상품 정보"
        min-width="350"
      >
        <template slot-scope="scope">
          <div class="prd_name">
            <span>{{scope.row.brand}}</span>
            <p>{{scope.row.name}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="판매가"
      >
        <template slot-scope="scope">{{ scope.row.price | comma}}</template>
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="수량">
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  filters:{
    comma(val){
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed:{
    ...mapGetters('order',['orderList'])
  }
}
</script>
<style lang="scss" scoped>
.prd_name{
  display: inline-block;
  margin-bottom: 5px;
  span{
    display: block;
    margin-bottom: 4px;
    color: #777;
    font-weight: 700;
  }
  p{
    overflow: hidden;
    max-height: 36px;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    word-break: normal;
    font-size: 14px;
    line-height: 18px;
    color: #000;
  }
}
</style>
