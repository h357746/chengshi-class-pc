<template>
  <!-- 条目卡片类容 -->
  <div class="item">
    <a-card
      hoverable
      style="width: 100%; height: 100%; border: none"
      @click="goPlay"
    >
      <img slot="cover" alt="example" :src="imgUrl + dataList.poster1" />

      <a-card-meta class="meta-title">
        <div class="title" slot="title">{{ dataList.title }}</div>
        <template slot="description"> {{ dataList.publishTime }}</template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Object,
      require: true,
      default: null
    }
  },

  data () {
    return {
      imgUrl: '/res' // 图片在服务器的路径
      // imgUrl: ''
    }
  },

  methods: {
    goPlay () {
      this.$router.push({ name: 'play', params: { id: this.dataList.id } })
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  width: 17.25rem;
  height: 100%;

  img {
    width: 100%;
    height: 10.375rem;
  }

  .meta-title {
    font-size: 0.75rem;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 1.0625rem;
    color: #9fb0bd;

    .title {
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
