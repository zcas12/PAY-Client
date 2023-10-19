<template>
  <div class="layout-default">
    <layout-header/>
    <layout-gnb/>
    <Nuxt/>
    <layout-footer/>
  </div>
</template>
<script>
export default {
  name: "default"
}
</script>
<style lang="scss">
.layout-default{
  width: 100%;
  min-width: 1020px;
  min-height: 100%;
  background: #fff;
}
</style>
