<template>
<!-- header导航条 -->
  <div class="header-content">
    <router-link to="/">
      <!-- logo单击可返回首页 -->
      <img src="@/static/images/lgoo@2x.png" alt=""
    /></router-link>
    <!-- 搜索框 -->
    <div class="search">
      <input v-model="keyword" placeholder="请输入关键字查询" />
      <button @click="search">搜索</button>
    </div>
  </div>
</template>

<script>
// import { getSearch } from '@/utils/request.js'
export default {
  name: 'HomeView',

  components: {},

  data () {
    return {
      keyword: ''
    }
  },

  methods: {
    search () {
      this.$emit('search', this.keyword)
    }
  }
}
</script>

<style lang="less" scoped>
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 73.5rem;
  height: 4rem;
  margin: 0 auto;

  img {
    width: 9.5625rem;
    height: 2.5625rem;
  }

  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 17.3125rem;
    height: 2rem;
    border: 0.0625rem solid #3ec29c;
    border-radius: 1rem;
    text-align: center;
    line-height: 1.875rem;
    font-size: 0.875rem;

    input {
      width: 12.875rem;
      height: 2rem;
      padding-left: 1rem;
      border: none;
      font-size: 0.875rem;
      line-height: 0.75rem;
      outline: none;
      background: none;
    }

    input::placeholder {
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.25);
    }

    button {
      position: relative;
      right: -0.125rem;
      width: 3.75rem;
      height: 2rem;
      border: none;
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
      font-size: 0.875rem;
      background: rgba(62, 194, 156, 0.8);
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }

    button:hover {
      background: rgb(62, 194, 156);
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
