<template>
  <!-- 首页分类展示 -->
  <div class="main">
    <!-- 分类标题 -->
    <div class="title">
      <span class="title-text">{{ itemList.title }}</span>
      <span class="titile-more" @click="more"></span>
    </div>
    <!-- 条目列表 -->
    <div class="container">
      <ContentItem v-for="item in data" :key="item.id" :dataList="item" />
    </div>
  </div>
</template>

<script>
import ContentItem from '@/components/ContentItem.vue'
import { getContentList } from '@/service/request'
export default {
  props: {
    itemList: {
      type: Object,
      require: true,
      default: null
    }
  },

  name: 'ContentClass',

  components: {
    ContentItem
  },

  data () {
    return {
      data: null
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    // 更多按钮跳转逻辑
    more () {
      this.$router.push({ name: 'details', params: { id: String(this.itemList.id), title: this.itemList.title } })
    },

    // 请求数据
    async getData () {
      const temp = await getContentList(this.itemList.id)
      this.data = temp.list.slice(0, 4)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin-top: 2rem !important;

  .title {
    display: flex;
    justify-content: space-between;

    .title-text {
      display: inline-block;
      width: 12.5remx;
      height: 2rem;
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 0.75rem;
      color: #112941;
      opacity: 1;
    }

    .titile-more {
      display: inline-block;
      width: 2.75rem;
      height: 1.25rem;
      background-image: url("@/static/images/more_du@2x.png");
      background-size: 2.75rem 1.25rem;
      cursor: pointer;
    }

    .titile-more:hover {
      background-image: url("@/static/images/more_choose@2x.png");
    }
  }
  .container {
    display: flex;
    margin-top: 1.5rem;
    width: 75rem;
    height: 16.625rem;

    .item {
      margin-right: 1.5rem;
      width: 17.25rem;
      height: 100%;

      img {
        width: 100%;
        height: 10.375rem;
      }
    }
  }
}
</style>
