<template>
  <div id="app">
<router-view />
  </div>
</template>
<script>

export default {
  name: 'App',
  components: {

  },
  computed: {}
  // 响应式
  // mounted () {
  //   document.addEventListener('DOMContentLoaded', this.inMobile)
  //   window.onresize = this.inMobile
  // },
  // methods: {
  //   inMobile () {
  //     document.getElementsByTagName('html')[0].style.fontSize =
  //           (document.documentElement.clientWidth / 450) * 6 + 'px'
  //   }
  // }
}
</script>
<style lang="less" scoped>

</style>
