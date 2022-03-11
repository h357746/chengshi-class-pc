<template>
  <div class="main" v-cloak>
    <div class="header"><Header @search="search" /></div>
    <div class="header-image" ref="header">
      <!-- 面包屑组件 -->
      <a-breadcrumb
        class="breadcrumb"
        style="
           {
            color: #fff;
          }
        "
      >
        <a-breadcrumb-item v-for="item in breadList" :key="item.name">
          <router-link
            v-if="item.name != name"
            :to="{ path: item.path === '' ? '/' : item.path }"
            >{{ item.meta.title }}</router-link
          >
          <span v-else>{{ item.meta.title }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div class="title-desc">
        <h1 class="title">{{ data.title }}</h1>
        <span class="publishTime">发布时间：{{ data.publishTime }}</span>
      </div>

      <!-- 毛玻璃效果 -->
      <div class="fillter-blur"></div>
      <div class="masking"></div>
    </div>
    <!-- 视频播放窗口 -->
    <div class="player">
      <video
        :src="data.contentVideoList ? data.contentVideoList[0].stbPath : ''"
        controls
        autoplay
        style="width= 100%; height=100%; object-fit: fill"
      ></video>
      <!-- 侧边信息栏 -->
      <div class="desc">
        <div class="speaker">
          <h1>
            <span></span>主讲人：
            <h3>{{ data.ext1 }}</h3>
          </h1>
        </div>
        <div class="time">
          <h1><span></span>培训时间：</h1>
          <h3>{{ data.ext2 }}</h3>
        </div>
        <div class="text">
          <h1><span></span>培训内容：</h1>
        </div>
        <div class="content" ref="desc"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfoContent, getSearch } from '@/service/request'
import Header from '@/components/Header.vue'
export default {
  props: {
    id: {
      type: Number,
      require: true
    }
  },

  name: 'PlayVideo',

  components: {
    Header
  },

  data () {
    return {
      breadList: [], // 面包屑
      data: {} // 数据
    }
  },

  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    // 初始化面包屑
    this.getBreadcrumb()
    // 异步获取数据
    this.getData()
  },
  mounted () {},
  methods: {
    async getData () {
      this.data = await getInfoContent(this.id)
      this.manageImg()
    },

    manageImg () {
      this.$refs.header.style.setProperty(
        '--bcColor',
        `url('/res${this.data.poster1}') no-repeat center center`
      )
      this.reg(this.data.content)
      this.$previewRefresh()
    },

    // 获取路由信息创建面包屑数据
    getBreadcrumb () {
      this.breadList = []
      this.name = this.$route.name
      this.$route.matched.forEach((item) => {
        this.breadList.push(item)
      })
      this.breadList.splice(1, 0, {
        name: 'details',
        path: '/details/5225120585127936',
        meta: { title: '分类' }
      })
    },

    // 解析处理img标签
    reg (str) {
      /* 字符串解析成元素节点类型 */
      // const reg = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi
      const o = document.createElement('div')
      o.innerHTML = str
      const imgTag = o.getElementsByTagName('img')
      for (const i of imgTag) {
        // str = i.outerHTML.replace(reg, function (match, url) {
        //   return url
        // })
        // i.src = 'http://192.168.1.151' + str
        i.setAttribute('preview', '')
      }
      this.$refs.desc.appendChild(o)
    },

    // 搜索
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
.main {
  min-height: 900px;
}
.header {
  display: flex;
  position: sticky;
  top: 0rem;
  justify-content: center;
  width: 100%;
  height: 4rem;
  background: rgba(255, 255, 255, 1);
  z-index: 20;
}

.header-image {
  --bcColor: url("@/static/images/banner@2x.png") no-repeat center center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 13.625rem;
  margin: 0 auto;
  background: var(--bcColor);
  background-size: 100% auto;

  .fillter-blur {
    display: block;
    position: absolute;
    width: 100%;
    height: 13.625rem;
    z-index: 1;
  }

  .fillter-blur::before {
    content: "";
    width: 100%;
    height: 12.625rem;
    z-index: -1;
    top: -0.3125rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bcColor);
    background-size: 100% auto;
    filter: blur(10px);
  }

  .masking {
    position: absolute;
    width: 100%;
    height: 13.625rem;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #ffffff;
    opacity: 0.55;
    z-index: 3;
    filter: blur(10px);
  }

  .breadcrumb {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    font-size: 1.125rem;
    z-index: 10;

    /deep/ .ant-breadcrumb-separator {
      color: rgb(0, 0, 0);
    }
    a {
      color: rgba(0, 0, 0, 0.65);
    }
    span {
      color: rgb(0, 0, 0);
    }
  }

  .title-desc {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 73.5rem;
    .title {
      margin: 0;
      align-self: flex-start;
      font-size: 36px !important;
      color: rgb(0, 0, 0);
      z-index: 10;
    }
    .publishTime {
      z-index: 10;
      align-self: flex-start;
      font-size: 0.875rem;
    }
  }
}

.player {
  display: flex;
  position: relative;
  width: 73.5rem;
  margin: 2rem auto 0 auto;
  text-align: center;

  video {
    width: 54.75rem;
    height: 30rem;
    background-color: rgb(0, 0, 0);
  }

  .desc {
    width: 17.1875rem;
    height: 30rem;
    padding: 0.625rem;
    background-color: rgb(255, 255, 255);
    text-align: left;

    .speaker,
    .time,
    .text {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-flow: nowrap;

      h1 {
        margin: 0;
        font-weight: 700;
      }
    }

    .speaker {
      h3 {
        display: inline;
        font-size: 1.1875rem;
      }
    }

    .time {
      flex-flow: wrap;

      h3 {
        font-weight: 400;
        margin: 0.25rem 0 0.25rem 1.25rem;
        font-size: 0.9375rem;
      }
    }

    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.9375rem;
      margin-right: 0.5rem;
      background-color: #3ec29c;
    }

    /deep/.content {
      margin-top: 0.5rem;
      height: 20.625rem;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        width: 0.375rem;
        background-color: #eee;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #c1c1c1;

        &:hover {
          background-color: #a8a8a8;
        }

        &:active {
          background-color: #787878;
        }
      }

      & {
        scrollbar-width: thin;
        scrollbar-color: #c1c1c1 #eee;
      }

      p {
        margin: 0;
      }
    }

    /deep/ .content div p > img {
      width: 15rem;
      height: 7.9375rem;
      margin-bottom: 0.3125rem;
    }
  }
}
</style>>
