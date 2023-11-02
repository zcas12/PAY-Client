<template>
  <div>{{ result.data }}</div>
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
}
</script>
<style lang="scss" scoped>

</style>
