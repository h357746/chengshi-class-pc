<template>
  <div id="app">
    <a-layout>
      <!-- header -->
      <!-- <a-layout-header class="header"></a-layout-header> -->
      <!-- content -->
      <a-layout-content class="content">
        <keep-alive include="MyContent"><router-view /></keep-alive>
        <!-- 返回顶部组件 -->
        <a-back-top class="top">
          <div class="ant-back-top-inner"></div>
        </a-back-top>
      </a-layout-content>
      <!-- <footer> -->
      <a-layout-footer class="footer"><FooterBody /> </a-layout-footer>
    </a-layout>
  </div>
</template>
<script>

import FooterBody from '@/components/Footer.vue'
export default {
  name: 'HomeView',
  components: {
    FooterBody
  }
}
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  font-size: 16px;
  background-color: rgba(239, 243, 245, 1);

  // .header {
  //   text-align: center;
  //   position: sticky;
  //   top: 0rem;
  //   width: 100%;
  //   height: 4rem;
  //   margin: 0 auto;
  //   background: rgba(255, 255, 255, 1);
  //   opacity: 1;
  //   z-index: 20;
  // }

  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 6.25rem;
    margin: 2rem auto 0 auto;
    text-align: center;
    font-size: .875rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.45);
    background-color: rgba(40, 40, 40, 1);
  }

  // .content {
  //   min-height: 7.5rem;
  //   min-height:53.125rem;
  //   margin-top: 2rem;
  // }

  .top {
    right: 4rem;
    bottom: 10.25rem;

    .ant-back-top-inner {
      width: 3.5rem;
      height: 3.5rem;
      background-image: url("@/static/images/top@2x.png");
      background-size: 3.5rem 3.5rem;
    }
  }
}
</style>
