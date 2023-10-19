<template>
  <footer id="footer">
    <div class="address h-50p">
    <p class="copyright">Copyright ⓒ NHN KCP Corp. All Rights Reserved.</p>
    </div>
  </footer>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
footer{
  width: 1020px;
  margin: 0 auto;
  min-width: 1020px;
  border-top: 1px solid #aaa;
  .address{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .copyright{
      color: #868e96;
      font-weight: 500;
      font-size: 14px;
    }
  }
}
</style>
