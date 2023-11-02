<template>
  <el-container direction="vertical" class="contents">
    <div class="icon-box">
      <i class="el-icon-success success-icon"></i>
      <p class="mt-3 mb-5">결제 완료</p>
      <button class="mb-5 home-btn" @click="home()">
        홈으로
      </button>
      {{ result.data }}
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
        this.result = query.result
      },
      deep: true,
      immediate: true
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
  .success-icon{
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
