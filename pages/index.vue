<template>
  <el-container class="contents">
    home
  </el-container>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware(context) {
    return context.redirect({ name: 'product' })
  }
}
</script>

