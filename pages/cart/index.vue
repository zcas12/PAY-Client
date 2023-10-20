<template>
  <el-container direction="vertical" class="contents">
    <div class="title-box">
      <h1>
        장바구니
      </h1>
      <ul class="step-list">
        <li class="on"><span class="step_num tx_num">1</span> 장바구니</li><!-- 현재단계 li에 클래스 on과 <span class="hide">현재단계</span> 넣어주세요 -->
        <li><span class="step_num tx_num">2</span> 주문/결제</li>
        <li class="last"><span class="step_num tx_num">3 </span> 주문완료</li>
      </ul>
    </div>
    <el-table
      ref="multipleTable"
      :data="cartList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="상품 정보"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        label="판매가"
      >
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="수량">
      </el-table-column>
      <el-table-column
        prop="shippingInfo"
        label="배송정보">
      </el-table-column>
    </el-table>
    <div class="price-info">
      <div class="btn-area">
        <button type="button" id="partDelBtn1"><span>선택상품 삭제</span></button>
        <button type="button" id="soldOutDelBtn1"><span>품절상품 삭제</span></button>
      </div>
      <div class="sum-price">총 판매가
        <span class="tx_num">{{ selectPrice | comma }}</span>원
<!--        <span class="tx_sign minus">-</span>총 할인금액
        <span class="tx_num">19,000</span>원-->
        <span class="tx_sign plus">+</span> 배송비
        <span class="tx_num">2,500</span>원
        <span class="span_quickDeliCharge" style="display:none;">(3!4!, 미드나잇 이용시)</span>
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
      <button type="button" class="all-order-btn">
        전체주문
      </button>
    </div>
  </el-container>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  data() {
    return {
      tableFields:[
        {label:"상품 정보", prop:"productInfo"},
        {label:"판매가", prop:"price"},
        {label:"수량", prop:"quantity"},
        {label:"배송 정보", prop:"shippingInfo"},
        {label:"선택", prop:"actions"},
      ],tableData: [
        {
          productInfo: '탄력 크림',
          price: 2000,
          quantity: 3,
          shippingInfo: '일반배송'
        }, {
          productInfo: '쿨 스테이지',
          price: 3000,
          quantity: 1,
          shippingInfo: '일반배송'
        }, {
          productInfo: '토너',
          price: 12000,
          quantity: 1,
          shippingInfo: '일반배송'
        }, {
          productInfo: '브러쉬',
          price: 5000,
          quantity: 3,
          shippingInfo: '일반배송'
        }
      ],
      multipleSelection: []
    }
  },
  filters:{
    comma(val){
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed:{
    ...mapGetters('cart',['cartList']),
    selectProduct(){
      return this.multipleSelection?.length
    },
    selectPrice(){
      const totalPrice = this.$_.map(this.multipleSelection, 'totalPrice')
      return this.$_.reduce(totalPrice, (acc, n) => acc + n, 0);
    },
    totalPrice(){
      return this.selectPrice + 2500
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    selectionPurchase(){
      console.log(this.multipleSelection)
    }
  }
}
</script>
<style>
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
    .tx_sign.minus{
      background-position: 0 50%;
    }
    .total-price{
      font-size: 14px;
      color: #f27370;
    }
  }
}
.order-btn-area{
  margin: 30px 0 0;
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
