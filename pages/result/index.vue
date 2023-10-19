<template>
  <div>
    성공?
<!--    {{result}}-->
    {{result.pay_data}}
  </div>
</template>
<script>
export default {
  async asyncData({req}){
    console.log(req.body)
    const result = req.body
    return{
      result
    }
  }
}
</script>
