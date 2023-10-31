<template>
  <div class="prd_info">
    <!--브랜드 & 상품 명-->
    <p class="prd_brand">
      {{ prd.brand }}
    </p>
    <p class="prd_name">
      {{ prd.name }}
    </p>
    <!--상품 가격-->
    <div class="price">
      <span class="price-1">
        <strong>{{prd.price | comma}}</strong>
        <span>원</span>
      </span>
    </div>
    <!--배송 정보-->
    <div class="prd_more_info">
      <div class="row">
        <p class="tit">배송정보</p>
        <ul class="bl_list">
          <li>
            <span>일반배송</span>
            <div>
              2,500원
              ( 20,000 원 이상 무료배송 )
              <br><em>올리브영  배송 </em>
              <em>평균 3일 이내 배송</em>
            </div>
          </li>
          <li>
            <span>픽업</span>
            <div>
              배송비 조건 없음
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--구매 수량-->
    <div class="option_add_area">
      <div class="prd_cnt_box">
        <div class="tit_area">
          <span>구매수량</span>
        </div>
        <div class="cont_area">
          <span class="option_cnt_box">
            <el-input-number size="small" v-model="num" :min="0">
            </el-input-number>
          </span>
        </div>
      </div>
    </div>
    <!--금액 * 수량-->
    <div class="prd_total_price">
      <span class="tx_tit">상품금액 합계</span>
      <span class="tx_cont">
        <span class="tx_num" id="totalPrcTxt">{{totalPrice|comma}}</span>원
      </span>
    </div>
    <div class="prd_btn_area">
      <button
        type="button"
        class="btnBasket goods_cart"
        @click="addToCart()"
      >
        장바구니
      </button>
      <button
        type="button"
        class="btnBuy goods_buy"
        @click="purchase()"
      >
        바로구매
      </button>
      <button class="btnZzim goods_wish">
      </button>
    </div>
  </div>
</template>
<script lang="js">
import {mapGetters, mapMutations} from "vuex";
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
      num: 1
    }
  },
  filters:{
    comma(val){
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed:{
    ...mapGetters('cart',['cartList']),
    totalPrice(){
      const result = this.prd?.price * this.num
      return result ? result : 0
    }
  },
  methods:{
    ...mapMutations('cart',['setCartList','addCart']),
    addToCart(){
      const chk = this.$_.findIndex(this.cartList,{'id' : this.prd.id})
      const param = {
        id: this.prd.id,
        code: this.prd.code,
        brand: this.prd.brand,
        name: this.prd.name,
        quantity: this.num,
        price: this.prd.price,
        shippingInfo: '일반배송'
      }
      if(chk < 0){
        this.setCartList(param)
      }else{
        this.addCart(param)
      }
      alert("장바구니에 추가했습니다.")
    },
    purchase(){
      this.$router.push({name:"cart"})
    }
  }
}
</script>
<style lang="scss" scoped>
.prd_info{
  position: relative;
  width: 100%;
  .prd_brand{
    font-size: 16px;
    line-height: 24px;
    color: #000;
  }
  .prd_name{
    margin-top: 10px;
    font-size: 26px;
    line-height: 34px;
    color: #000;
  }

  .prd_more_info{
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    .row:first-child {
      border-top: 0;
    }
    .row {
      display: block;
      padding: 15px 0 20px;
      border-top: 1px solid #e5e5e5;
      .tit{
        position: relative;
        font-size: 16px;
        line-height: 30px;
        margin-bottom: 5px;
        color: #000;
        font-weight: 700;
      }
      .bl_list{
        *{
          letter-spacing: 0;
        }
        li{
          display: table;
          table-layout: fixed;
          font-size: 15px;
          color: #555;
          span{
            position: relative;
            width: 66px;
            display: table-cell;
            font-weight: 700;
          }
          span:after {
            content: "";
            position: absolute;
            right: 0;
            top: 4px;
            width: 1px;
            height: 14px;
            background-color: #d8d8d8;
          }
          div {
            display: table-cell;
            padding-left: 10px;
            em {
              display: inline-block;
              position: relative;
              font-style: normal;
              vertical-align: top;
            }
            em+em{
              padding-left: 8px;
              margin-left: 4px;
            }
            em+em:before {
              content: "";
              position: absolute;
              left: 0;
              top: 5px;
              width: 1px;
              height: 11px;
              line-height: 12px;
              background-color: #d8d8d8;
            }
          }
        }
      }
    }
  }

  .price{
    position: relative;
    margin-top: 15px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    .price-1{
      font-size: 28px;
      color: #e02020;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      font-weight: 700;
      span{
        padding-top: 2px;
        font-size: 22px;
      }
    }
  }
  .option_add_area{
    .prd_cnt_box{
      border-radius: 5px;
      position: relative;
      margin: 30px 0 0;
      min-height: 60px;
      padding: 15px 20px;
      border: 1px solid #e9e9e9;
      background: #f9f9f9;
      .tit_area{
        color: #333;
        line-height: 30px;
      }
      .cont_area{
        position: absolute;
        bottom: 15px;
        right: 22px;
        max-width: 50%;
        .option_cnt_box{
          border-radius: 5px;
          display: block;
          max-width: 135px;
          border: 1px solid #ddd;
          overflow: hidden;
        }
      }
    }
  }
  .prd_total_price{
    overflow: hidden;
    height: 60px;
    margin: 10px 0 0;
    padding: 18px 0 0;
    border-bottom: 2px solid #f27370;
    color: #e02020;
    font-weight: 700;
    .tx_tit {
      float: left;
      font-size: 18px;
    }
    .tx_cont {
      float: right;
      .tx_num {
        font-size: 22px;
        margin-right: 2px;
        vertical-align: -2px;
        letter-spacing: -.04em!important;
        font-weight: 500;
      }
    }
  }
  .prd_btn_area{
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    margin: 30px 0 0;
    button{
      height: 65px;
      margin-left: 0;
      font-size: 20px;
      font-weight: 500;
    }
    .btnBasket{
      color: #ff5753;
      width: 136px;
      border: 1px solid #ff5753;
      background: #fff;
    }
    .btnBuy{
      width: 136px;
      background: #f27370;
      border: 1px solid #ff5753;
      color: #fff;
      float: left;
    }
    .btnZzim{
      width: 76px;
      border: 1px solid #e5e5e5;
      background-size: 34px auto;
      background: url(https://static.oliveyoung.co.kr/pc-static-root/image/comm/ico_zzim.png) 50% 50% no-repeat;
    }
  }
}
</style>
