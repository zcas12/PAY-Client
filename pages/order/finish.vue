<template>
  <el-container direction="vertical" class="contents">
    <client-only>
      <div v-if="loading" class="overlay">
        <i class="el-icon-loading loading"></i>
      </div>
    </client-only>
    <div v-if="resCd === '0000' && !loading" class="icon-box">
      <i class="el-icon-success success-icon"></i>
      <p class="mt-3 mb-5">결제 완료</p>
      <button class="mb-5 home-btn" @click="home()">
        홈으로
      </button>
      <el-descriptions class="mt-10" title="응답결과" direction="vertical" :column="4" border>
        <el-descriptions-item label="res_msg"><el-tag size="small">{{result?.res_msg}}</el-tag></el-descriptions-item>
        <el-descriptions-item label="ordr_idxx">{{result?.ordr_idxx}}</el-descriptions-item>
        <el-descriptions-item label="amount" >{{result?.amount}}</el-descriptions-item>
        <el-descriptions-item label="pay_method">{{result?.pay_method}}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div v-if="resCd !== '0000' && !loading" class="icon-box">
      <i class="el-icon-error"></i>
      <p class="mt-3 mb-5">결제 실패</p>
      <button class="mb-5 home-btn" @click="home()">
        홈으로
      </button>
      <el-descriptions class="mt-10" title="응답결과" direction="vertical" :column="4" border>
        <el-descriptions-item label="res_msg"><el-tag size="small" type="danger">{{result?.res_msg}}</el-tag></el-descriptions-item>
        <el-descriptions-item label="res_cd">{{result?.res_cd}}</el-descriptions-item>
      </el-descriptions>
    </div>
  </el-container>
</template>
<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      loading:false,
      result:{},
      res_cd:'',
      enc_info:'',
      enc_data:'',
      res_msg:'',
      tran_cd:'',
      ret_pay_method:'',
      use_pay_method:'',
    }
  },
  created() {
    this.loading = true;
    this.reqParamSetting(this.$route.query)
  },
  mounted() {
    this.completePayment()
  },
  watch: {
    /*'$route.query': {
      handler: function(query) {
        this.result = query?.result?.data
      },
      deep: true,
      immediate: true
    }*/
  },
  computed:{
    resCd(){
      return this.result?.res_cd
    }
  },
  methods:{
    ...mapActions('order',['paymentV1']),
    home(){
      this.$router.push({name:"product"})
    },
    reqParamSetting(query){
      this.res_cd = query.res_cd;
      this.enc_info = query.enc_info;
      this.enc_data = query.enc_data;
      this.res_msg = query.res_msg;
      this.tran_cd = query.tran_cd;
      this.ret_pay_method = query.ret_pay_method;
      this.use_pay_method = query.use_pay_method;
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
          this.result = result?.data

        })
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
.icon-box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #FF3656;
  .success-icon, .el-icon-error {
    font-size: 4.5em
  }
  p{
    font-size: 1.5em;
    font-weight: 500;
  }
  .home-btn{
    width: 100px;
    padding: 17px 0 15px;
    margin: 10px 0;
    border-radius: 5px;
    font-size: 18px;
    color: #fff;
    background: #FF3656;
    line-height: 18px;
    outline: none;
    border: 0;
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
