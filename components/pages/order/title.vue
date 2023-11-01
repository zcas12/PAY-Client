<template>
  <div class="title-box">
    <h1>
      {{title}}
    </h1>
    <ul class="step-list">
      <!-- 현재단계 li에 클래스 on과 <span class="hide">현재단계</span> 넣어주세요 -->
      <li :class="step === 1 ? 'on' : 'off'">
        <span class="step_num tx_num">1</span> 장바구니
      </li>
      <li :class="step === 2 ? 'on' : 'off'">
        <span class="step_num tx_num">2</span> 주문/결제
      </li>
      <li :class="step === 3 ? 'on' : 'off'" class="last">
        <span class="step_num tx_num">3 </span>주문완료
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props:{
    title: {
      type: String,
    },
    step: {
      type: Number,
    },
  }
}
</script>
<style lang="scss" scoped>
.title-box{
  overflow: hidden;
  width: 100%;
  height: 140px;
  border-radius: 5px;
  h1{
    float: left;
    padding: 37px 0 0;
    font-size: 40px;
    color: #000;
    line-height: 40px;
  }
  .step-list {
    float: right;
    li {
      float: left;
      height: 120px;
      padding: 0 30px 0 20px;
      line-height: 120px;
      text-align: center;
      font-size: 24px;
      color: #8b8176;
      white-space: nowrap;
    }
    li.on{
      color: #000;
    }
  }
}
</style>
