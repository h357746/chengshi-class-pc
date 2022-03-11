<template>
  <div>
    <div class="header"><Header @search="search" /></div>
    <div class="main">
      <!-- 此处定义轮播图 -->
      <SwiperL class="myswiper" />
      <!-- 此处定义展示内容 -->
      <ContentClass v-for="item in data" :key="item.id" :itemList="item" />
    </div>
  </div>
</template>

<script>
import ContentClass from '@/components/ContentClass.vue'
import SwiperL from '@/components/SwiperL.vue'
import { getCategoryList, getSearch } from '@/service/request'
import Header from '@/components/Header.vue'
export default {
  name: 'MyContent',

  components: {
    Header,
    SwiperL,
    ContentClass
  },

  data () {
    return {
      data: null // 初始化数据
    }
  },

  mounted () {
    // 页面挂载时请求数据
    this.getData()
  },

  methods: {
    // 定义请求首页数据的方法
    async getData () {
      const temp = await getCategoryList()
      this.data = temp.list
      // 保存分类数据到vuex
      const category = []
      // 生成分类标题和id对象
      this.data.forEach((element) => {
        category.push({ title: element.title, id: element.id })
      })
      // 提交action保存
      this.$store.dispatch('pathCategory', category)
    },

    async search (keyword) {
      const params = {
        keyword,
        pageNo: 1,
        pageSize: 40
      }
      const result = await getSearch(params)
      this.$router.push({
        name: 'details',
        params: {
          data: result.data,
          id: '5225120585127936',
          title: '全部'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  position: sticky;
  top: 0rem;
  justify-content: center;
  width: 100%;
  height: 4rem;
  background: rgba(255, 255, 255, 1) !important;
  z-index: 20;
}

.main {
  width: 73.5rem;
  margin: 0 auto;
  margin-top: 2rem;
}
</style>
>
