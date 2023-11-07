<template>
  <el-container direction="vertical" class="contents">
    <div v-if="resCd === '0000'" class="icon-box">
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
    <div v-else class="icon-box">
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
export default {
  data() {
    return {
      result:{}
    }
  },
  watch: {
    '$route.query': {
      handler: function(query) {
        this.result = query?.result?.data
      },
      deep: true,
      immediate: true
    }
  },
  computed:{
    resCd(){
      return this.result?.res_cd
    }
  },
  methods:{
    home(){
      this.$router.push({name:"product"})
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
</style>
