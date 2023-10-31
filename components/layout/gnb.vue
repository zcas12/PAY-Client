<template>
  <div id="gnb">
    <div id="gnbWrap">
      <ul class="gnb-menu-list">
        <li
          v-for="(menu,index) in menus"
          :key="index"
        >
          <nuxt-link :to="{path:menu.url, query:{code:menu.code}}">{{menu.title}}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      menus:[
        {title:"전체", url:"product", code:'total'},
        {title:"스킨케어", url:"product", code:'skin'},
        {title:"클렌징", url:"product", code:'cleansing'},
        {title:"샴푸/린스", url:"product", code:'shampoo'},
        {title:"트리트먼트/팩", url:"product", code:'treatments'},
      ]


    }
  }
}
</script>
<style lang="scss">
#gnb{
  position: relative;
  width: 100%;
  min-width: 1020px;
  height: 47px;
  background: #fff;
  border-top: 1px solid #ddd;
  border-bottom: 2px solid #555;
  z-index: 10;
  #gnbWrap{
    position: relative;
    width: 1020px;
    margin: 0 auto;
    .gnb-menu-list{
      position: relative;
      top: 0;
      right: 0;
      li{
        float: left;
        margin-left: 45px;
        a{
          display: block;
          height: 44px;
          line-height: 44px;
          color: #000;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -.04em;
        }
        a:hover {
          color: #e02020;
        }
      }
    }
  }
}
</style>
