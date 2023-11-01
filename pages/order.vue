<template>
  <el-container direction="vertical" class="contents">
    <order-title :title="title" :step="step"></order-title>
    <nuxt-child></nuxt-child>
  </el-container>
</template>
<script>
export default {
  asyncData({route}){
    return{
      routeName:route.name
    }
  },
  data() {
    return {
      routeName:""
    }
  },
  watch: {
    '$route.name': {
      handler: function(name) {
        this.routeName = name
      },
      deep: true,
      immediate: true
    }
  },
  computed:{
    title(){
      if (this.routeName === 'order-cart'){
        return "장바구니"
      }else if (this.routeName === 'order-payment'){
        return "주문/결제"
      }else if (this.routeName === 'order-finish'){
        return "주문완료"
      }
    },
    step(){
      if (this.routeName === 'order-cart'){
        return 1
      }else if (this.routeName === 'order-payment'){
        return 2
      }else if (this.routeName === 'order-finish'){
        return 3
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
