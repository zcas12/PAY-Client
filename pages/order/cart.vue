<template>
  <el-container direction="vertical" class="contents">
    <el-table
      ref="multipleTable"
      :data="tableList"
      @selection-change="handleSelectionChange"
    >
      <div slot="empty">
        장바구니에 저장된 상품이 없습니다.
      </div>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="상품 정보"
        min-width="250"
      >
        <template slot-scope="scope">
          <div class="prd_info">
            <div class="prd_img">
              <img
                :src="scope.row.src"
                alt="장바구니 상품 임시 이미지"
              >
            </div>
            <div class="prd_name">
              <span>{{scope.row.brand}}</span>
              <p>{{scope.row.name}}</p>
            </div>
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
        <template slot-scope="scope">
          <el-input-number
            size="mini"
            v-model="scope.row.quantity"
          >
          </el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="shippingInfo"
        label="배송정보">
      </el-table-column>
    </el-table>

    <div class="price-info">
      <div class="btn-area">
        <button type="button" id="partDelBtn1" @click="deleteSelection()">
          <span>선택상품 삭제</span>
        </button>
        <!--        <button type="button" id="soldOutDelBtn1"><span>품절상품 삭제</span></button>-->
      </div>
      <div class="sum-price">총 판매가
        <span class="tx_num">{{ selectPrice | comma }}</span>원
        <span class="tx_sign plus">+</span> 배송비
        <span class="tx_num">{{ deliveryFee | comma }}</span>원
        <span class="tx_sign equal">=</span>
        <span class="total-price">총 결제금액
          <span class="tx_price">
          <span class="tx_num">{{ totalPrice | comma }}</span>
            원
          </span>
        </span>
      </div>
    </div>
    <div class="order-btn-area">
      <button type="button" class="part-order-btn" @click="selectionPurchase()">
        선택주문({{selectProduct}})
      </button>
      <button type="button" class="all-order-btn"  @click="totalPurchase()">
        전체주문
      </button>
    </div>
  </el-container>
</template>
<script>
import {mapGetters,mapMutations} from "vuex";
export default {
  data() {
    return {
      multipleSelection: []
    }
  },
  filters:{
    comma(val){
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed:{
    ...mapGetters('order',['cartList']),
    tableList(){
      return this.$_.cloneDeep(this.cartList)
    },
    /* 선택된 상품 갯수*/
    selectProduct(){
      return this.multipleSelection?.length
    },
    /* 선택된 상품 가격*/
    selectPrice(){
      const price = this.$_.map(this.multipleSelection, (selection)=>{
        return selection.price * selection.quantity
      })
      return this.$_.reduce(price, (acc, n) => acc + n, 0);
    },
    /*배송비*/
    deliveryFee(){
      return this.selectPrice ? 2500 : 0
    },
    /* 선택된 상품 가격 + 배송비*/
    totalPrice(){
      return this.selectPrice > 0 ? this.selectPrice + this.deliveryFee : 0
    }
  },
  methods:{
    ...mapMutations('order',['deleteCart','setOrderList']),
    /*테이블 셀렉트 이벤트*/
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /*선택 구매버튼*/
    selectionPurchase(){
      console.log(this.multipleSelection)
      if (this.multipleSelection.length > 0){
        this.setOrderList(this.multipleSelection)
        this.$router.push({name:"order-payment"});
      }else{
        alert("주문가능한 상품이 없습니다.");
      }
    },
    /*전체 구매*/
    totalPurchase(){
      console.log(this.tableList)
      if (this.tableList.length > 0){
        this.setOrderList(this.tableList)
        this.$router.push({name:"order-payment"});
      }else{
        alert("주문가능한 상품이 없습니다.");
      }
    },
    /*선택 삭제*/
    deleteSelection(){
      this.multipleSelection.forEach((val)=>{
        this.deleteCart(val);
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.prd_info{
  display: table-cell;
  position: relative;
  height: 110px;
  padding: 30px 30px 30px 125px;
  border-left: 0;
  text-align: left;
  vertical-align: middle;
}
.prd_img {
  position: absolute;
  top: 50%;
  left: 0;
  width: 125px;
  height: 85px;
  margin-top: -42px;
  text-align: center;
  img {
    width: auto!important;
    max-width: 85px;
    height: auto!important;
    max-height: 85px;
  }
}
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
.title-box{
  overflow: hidden;
  width: 100%;
  height: 140px;
  border-radius: 5px;
  h1{
    float: left;
    padding: 37px 0 0;
    font-size: 40px;
    color: #000;
    line-height: 40px;
  }
  .step-list {
    float: right;
    li {
      float: left;
      height: 120px;
      padding: 0 30px 0 20px;
      line-height: 120px;
      text-align: center;
      font-size: 24px;
      color: #8b8176;
      white-space: nowrap;
    }
    li.on{
      color: #000;
    }
  }
}
.price-info{
  overflow: hidden;
  margin: 10px 0 0;
  .btn-area{
    float: left;
    width: 300px;
    button{
      border: 1px solid #aaa;
      color: #666;
      background: #fff;
      height: 28px;
      padding: 0 15px;
      font-size: 12px!important;
      line-height: 28px;
      border-radius: 5px;
    }
  }
  .sum-price{
    color: #666;
    font-weight: 700;
    float: right;
    width: 700px;
    margin: 5px 0 0;
    line-height: 18px;
    text-align: right;
    .tx_sign{
      margin: 0 5px;
      width: 10px;
      height: 10px;
    }
    .total-price{
      font-size: 14px;
      color: #f27370;
    }
  }
}
.order-btn-area{
  margin: 20px 0 20px 0;
  text-align: center;
  .part-order-btn{
    font-size: 16px;
    width: 180px;
    height: 50px;
    background-color: #fff;
    border: 1px solid #f27370;
    padding: 11px 0 9px;
    line-height: 28px;
    color: #f27370;
    border-radius: 5px;
  }
  .all-order-btn{
    width: 180px;
    height: 50px;
    background-color: #f27370;
    padding: 11px 0 9px;
    font-size: 18px;
    text-align: center;
    color: #fff;
    line-height: 30px;
    border-radius: 5px;
    border: 0;
  }
}
</style>
