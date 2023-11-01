<template>

</template>
<script>
export default {
  middleware(context) {
    return context.redirect({ name: 'order-cart' })
  }
}
</script>
<style lang="scss" scoped>

</style>
