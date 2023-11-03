<template>
  <div>
<!--    <div v-show="loading" class="overlay">
      <i class="el-icon-loading loading"></i>
    </div>-->
    <el-table
      :data="orderList"
      height="450"
    >
      <div slot="empty">
        상품이 없습니다.
      </div>
      <el-table-column
        prop="name"
        label="상품 정보"
        min-width="350"
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
      </el-table-column>

    </el-table>


    <div class="order_payment_box">
      <div class="left_area">
        <div class="title_wrap" id="payMethod_div">
          <h2 class="sub-title2">결제수단 선택</h2>
        </div>
        <ul class="payment_info_form" id="payMethodList">
          <li class="bg_area">
            <el-radio-group v-model="payMethod">
              <el-radio label="100000000000">신용카드</el-radio>
              <el-radio label="010000000000">계좌이체</el-radio>
              <el-radio label="001000000000">가상계좌</el-radio>
              <el-radio label="000100000000">포인트</el-radio>
              <el-radio label="000010000000">휴대폰</el-radio>
            </el-radio-group>
          </li>
        </ul>
        <div class="all_agree_cont">
          <el-checkbox v-model="termsCheck">주문 상품정보 및 결제대행 서비스 이용약관에 모두 동의하십니까?</el-checkbox>
        </div>
      </div>

      <div class="right_area">
        <h2 class="sub-title2">최종 결제정보</h2>
        <ul class="total_payment_box">
          <li>
            <span class="tx_tit">총 상품금액</span>
            <span class="tx_cont">
              <span class="tx_num">{{ selectPrice | comma }}</span>원
            </span>
          </li>
          <li class="line_top2">
            <span class="tx_tit">총 배송비
            </span>
            <span class="tx_cont">
              <span class="tx_num" id="dlexPayAmt_span">{{ deliveryFee | comma }}</span>원
            </span>
          </li>
          <li class="total">
            <span class="tx_tit">최종 결제금액</span>
            <span class="tx_cont">
              <span class="tx_num" id="totPayAmt_sum_span">{{ totalPrice | comma }}</span>원
            </span>
          </li>
          <li>
            <button
              type="button"
              class="btnPayment"
              name="btnPay"
              @click="payClick()"
            >
              결제하기
            </button>
          </li>
        </ul>
      </div>
    </div>

    <form id="order_info" name="order_info">
      <input type="hidden" name="site_cd" value="T0000" />
      <input type="hidden" name="site_name" value="TEST SITE" />
      <input type="hidden" name="ordr_idxx" value="TEST1234567890" />
      <input type="hidden" name="pay_method" v-model="payMethod" />
      <input type="hidden" name="buyr_name" value="이재혁" />
      <input type="hidden" name="good_mny" v-model="totalPrice" />
      <input type="hidden" name="good_name" v-model="goodName" />
      <input type="hidden" name="res_cd"          v-model="res_cd"/>
      <input type="hidden" name="res_msg"         v-model="res_msg"/>
      <input type="hidden" name="enc_info"        v-model="enc_info"/>
      <input type="hidden" name="enc_data"        v-model="enc_data"/>
      <input type="hidden" name="ret_pay_method"  v-model="ret_pay_method"/>
      <input type="hidden" name="tran_cd"         v-model="tran_cd"/>
      <input type="hidden" name="use_pay_method"  v-model="use_pay_method"/>
    </form>
  </div>
</template>
<script>
import {mapGetters,mapActions} from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      loading:false,
      payMethod: "100000000000",
      termsCheck:false,
      res_cd:'',
      enc_info:'',
      enc_data:'',
      res_msg:'',
      tran_cd:'',
      ret_pay_method:'',
      use_pay_method:'',
    }
  },
  filters:{
    comma(val){
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed:{
    ...mapGetters('order',['orderList']),
    /* 선택된 상품 가격*/
    selectPrice(){
      const price = this.$_.map(this.orderList, (selection)=>{
        return selection.price * selection.quantity
      })
      return this.$_.reduce(price, (acc, n) => acc + n, 0);
    },
    /* 배송비 */
    deliveryFee(){
      return this.selectPrice ? 2500 : 0
    },
    /* 선택된 상품 가격 + 배송비 */
    totalPrice(){
      return this.selectPrice > 0 ? this.selectPrice + this.deliveryFee : 0
    },
    /*상품명*/
    goodName(){
      const length = this.orderList.length
      return length > 1
             ? this.orderList[0]?.name + ' 외 ' + (length - 1)+'건'
             : this.orderList[0]?.name
    }
  },
  watch:{
    /*인증 완료시 파라미터 바인딩*/
    '$route.query': {
      handler(query) {
        this.res_cd = query.res_cd;
        this.enc_info = query.enc_info;
        this.enc_data = query.enc_data;
        this.res_msg = query.res_msg;
        this.tran_cd = query.tran_cd;
        this.ret_pay_method = query.ret_pay_method;
        this.use_pay_method = query.use_pay_method;
        if (query.res_cd) this.completePayment();
      },
      deep: true,
      immediate: true
    }
  },
  methods:{
    ...mapActions('order',['paymentV1']),
    /*결제하기 버튼*/
    payClick(){
      if(!this.termsCheck) {
        alert("약관에 동의해주세요.");
      }else if(this.orderList.length < 1){
        alert("주문상품 오류");
      }else{
        /*
          ==================필수======================
          site_cd 상점코드:  T0000
          ordr_idxx 주문번호:  TEST1234567890
          pay_method 결제수단:  100000000000
          good_mny 요청금액:  1004
          good_name 상품명:  운동화
          ==================선택======================
          상점이름:  TEST SITE
          주문자:  홍길동
          주문자 이메일:  test@test.co.kr
          주문자 전화번호:  02-0000-0000
          주문자 휴대번호:  010-0000-0000
        */

        const form  = document.getElementById('order_info');
        try
        {
          KCP_Pay_Execute_Web( form );
        }
        catch (e)
        {
          /* IE 에서 결제 정상종료시 throw로 스크립트 종료 */
        }
      }
    },
    /*인증완료시 요청*/
    completePayment(){
      this.loading = true;
      const KCP_CERT_INFO = '-----BEGIN CERTIFICATE-----MIIDgTCCAmmgAwIBAgIHBy4lYNG7ojANBgkqhkiG9w0BAQsFADBzMQswCQYDVQQGEwJLUjEOMAwGA1UECAwFU2VvdWwxEDAOBgNVBAcMB0d1cm8tZ3UxFTATBgNVBAoMDE5ITktDUCBDb3JwLjETMBEGA1UECwwKSVQgQ2VudGVyLjEWMBQGA1UEAwwNc3BsLmtjcC5jby5rcjAeFw0yMTA2MjkwMDM0MzdaFw0yNjA2MjgwMDM0MzdaMHAxCzAJBgNVBAYTAktSMQ4wDAYDVQQIDAVTZW91bDEQMA4GA1UEBwwHR3Vyby1ndTERMA8GA1UECgwITG9jYWxXZWIxETAPBgNVBAsMCERFVlBHV0VCMRkwFwYDVQQDDBAyMDIxMDYyOTEwMDAwMDI0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAppkVQkU4SwNTYbIUaNDVhu2w1uvG4qip0U7h9n90cLfKymIRKDiebLhLIVFctuhTmgY7tkE7yQTNkD+jXHYufQ/qj06ukwf1BtqUVru9mqa7ysU298B6l9v0Fv8h3ztTYvfHEBmpB6AoZDBChMEua7Or/L3C2vYtU/6lWLjBT1xwXVLvNN/7XpQokuWq0rnjSRThcXrDpWMbqYYUt/CL7YHosfBazAXLoN5JvTd1O9C3FPxLxwcIAI9H8SbWIQKhap7JeA/IUP1Vk4K/o3Yiytl6Aqh3U1egHfEdWNqwpaiHPuM/jsDkVzuS9FV4RCdcBEsRPnAWHz10w8CX7e7zdwIDAQABox0wGzAOBgNVHQ8BAf8EBAMCB4AwCQYDVR0TBAIwADANBgkqhkiG9w0BAQsFAAOCAQEAg9lYy+dM/8Dnz4COc+XIjEwr4FeC9ExnWaaxH6GlWjJbB94O2L26arrjT2hGl9jUzwd+BdvTGdNCpEjOz3KEq8yJhcu5mFxMskLnHNo1lg5qtydIID6eSgew3vm6d7b3O6pYd+NHdHQsuMw5S5z1m+0TbBQkb6A9RKE1md5/Yw+NymDy+c4NaKsbxepw+HtSOnma/R7TErQ/8qVioIthEpwbqyjgIoGzgOdEFsF9mfkt/5k6rR0WX8xzcro5XSB3T+oecMS54j0+nHyoS96/llRLqFDBUfWn5Cay7pJNWXCnw4jIiBsTBa3q95RVRyMEcDgPwugMXPXGBwNoMOOpuQ==-----END CERTIFICATE-----';

      if( this.res_cd === "0000" ){
        const reqData = {
          tran_cd : this.isEmpty(this.tran_cd),
          site_cd : 'T0000',
          kcp_cert_info : KCP_CERT_INFO,
          enc_data : this.isEmpty(this.enc_data),
          enc_info : this.isEmpty(this.enc_info),
          ordr_mony : this.totalPrice// 결제요청금액   ** 1 원은 실제로 업체에서 결제하셔야 될 원 금액을 넣어주셔야 합니다. 결제금액 유효성 검증 **
        };
        this.paymentV1(reqData).then((result)=>{
          this.loading = false;
          this.$router.push({ name: 'order-finish',query: {result: result}})
        })
/*        fetch("https://stg-spl.kcp.co.kr/gw/enc/v1/payment", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req_data),
        })
        // 결제 API RES
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data)
          this.$router.push({ name: 'order-finish', query: {result: data} })
        });*/
      }else {
        alert( "[" + this.res_cd + "] " + this.res_msg );

        closeEvent();
      }

    },
    isEmpty(val) {
      if ( val == null ) val = '';
      return val;
    }

  }
}
</script>
<style lang="scss" scoped>
.prd_info{
  display: table-cell;
  position: relative;
  height: 145px;
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
.order_payment_box {
  overflow: hidden;
  width: 1020px;
  .left_area {
    float: left;
    width: 700px;
    .title_wrap {
      position: relative;
      width: 100%;
      .sub-title2 {
        margin: 40px auto 10px;
        color: #333;
        font-size: 20px;
        font-weight: 400;
      }
    }
    .payment_info_form {
      border-top: 2px solid #888;
      .bg_area{
        padding: 20px;
      }
    }
    .all_agree_cont {
      position: relative;
      width: 100%;
      padding: 20px;
      font-size: 14px;
      color: #222;
    }

  }
  .right_area {
    float: right;
    width: 300px;
    .sub-title2 {
      color: #4c4c4c;
      margin: 40px auto 10px;
      font-size: 20px;
      font-weight: 400;
    }
    .total_payment_box {
      padding: 10px 0;
      border: 2px solid #666;
      margin-bottom: 10px;
      li {
        overflow: hidden;
        padding: 0 20px;
        line-height: 32px;
        color: #222;
        .tx_tit {
          float: left;
          width: 140px;
        }
        .tx_cont {
          float: right;
          font-weight: 700;
        }
        .btnPayment {
          width: 100%;
          padding: 17px 0 15px;
          margin: 10px 0;
          border-radius: 5px;
          font-size: 18px;
          color: #fff;
          background: #f27370;
          line-height: 18px;
          outline: none;
          border: 0;
        }
      }
      .total {
        border-top: 1px solid #888;
        margin-top: 10px;
        padding: 20px 20px 10px;
        .tx_tit {
          font-size: 16px;
          font-weight: 700;
        }
        .tx_cont {
          color: #ff2828;
          font-size: 16px;
        }
      }
    }
  }
}
.overlay{
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: black;
  opacity: 0.7;
  .loading{
    font-size: 24px;
    color: cornflowerblue;
  }
  .loading-text{
    font-size: 14px;
    color: cornflowerblue;
  }
}
</style>
