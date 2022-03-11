<template>
  <!-- 分类展示页面 -->
  <div class="main">
    <div class="header">     <Header @search="search" /></div>

    <!-- 分类页页头毛玻璃效果组件 -->
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
        <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
          <router-link
            v-if="item.name != name && index != 1"
            :to="{ path: item.path === '' ? '/' : item.path }"
            >{{ item.meta.title }}</router-link
          >
          <span v-else>{{ item.meta.title }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <!-- 毛玻璃效果 -->
      <div class="fillter-blur">
        <!-- <img :src="imgUrl" alt="" /> -->
      </div>
      <div class="masking"></div>
    </div>
    <!-- 分类页主体内容 -->
    <div class="detail">
      <!-- 分类菜单 -->
      <a-affix :offset-top="top">
        <div class="class-menu">
          <h1 class="title">{{ choose }}</h1>
          <div class="class-list" id="menu">
            <ul>
              <li
                :class="{
                  element: true,
                  'class-choose': item.title === choose,
                }"
                v-for="item in category"
                :key="item.id"
                @click="go(item.title, item.id)"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>
        </div>
      </a-affix>

      <!-- 快捷分页 -->
      <div class="page" v-show="pageShow">
        {{ pageNo }}/{{ totalPage }} 到第<input
          type="text"
          v-model="inputPage"
          :placeholder="pageNo"
          @keyup.enter="jumpToPage"
        />页<button
          class="btn-prev"
          @click="prev"
          :disabled="this.pageNo === 1"
        ></button
        ><button
          class="btn-next"
          @click="next"
          :disabled="this.pageNo === this.totalPage"
        ></button>
      </div>
      <!-- 内容列表 -->
      <div class="class-detail">
        <a-spin class="show" tip="加载数据中..." size="large" v-if="load" />
        <a-empty
          class="show"
          v-if="show"
          :imageStyle="{ width: '12.5rem', height: '12.5rem' }"
          ><span slot="description">暂无数据</span>
        </a-empty>
        <content-item
          class="detail-item"
          :dataList="item"
          v-for="item in classList"
          :key="item.id"
        />
      </div>
      <!-- 分页器 -->
      <div class="components-pagination" v-show="pageShow">
        <a-config-provider :locale="locale">
          <a-pagination
            v-model="pageNo"
            :pageSize="pageSize"
            :total="total"
            :page-size-options="pageSizeOptions"
            @showSizeChange="onShowSizeChange"
            show-size-changer
            show-quick-jumper
            @change="pageChange"
          ><template slot="buildOptionText" slot-scope="props">
      <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
      <span v-if="props.value === '50'">全部</span>
    </template></a-pagination>
        </a-config-provider>
      </div>
    </div>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import ContentItem from '@/components/ContentItem.vue'
import { getDetails, getSearch } from '@/service/request'
import Header from '@/components/Header.vue'
export default {
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },

    data: {
      type: Object,
      required: false,
      default: null
    },

    title: {
      type: String,
      required: false,
      default: ''
    }
  },

  name: 'ClassDetails',
  components: {
    Header,
    ContentItem
  },

  data () {
    return {
      classList: null,
      choose: '全部',
      currentId: '5225120585127936', // 当前分类ID
      pageNo: 1, // 当前页数
      total: 0, // 条目总数
      totalPage: 0, // 总页数
      pageSize: 12, // 每页显示数量
      inputPage: 1, // 快捷分页输入的页数
      locale: zhCN,
      show: true, // 无数据状态效果控制
      name: '',
      breadList: [], // 面包屑数据
      pageSizeOptions: ['12', '24', '36', '48', '50'], // 分页列表
      imgUrl: '', // 毛玻璃图片路径
      bgSytle: '',
      load: false,
      top: 90,
      state: 'more',
      pageShow: false,
      keyword: ''
    }
  },

  computed: {
    category () {
      return this.$store.getters.category // 获取vuex中的分类列表数据
    }
  },

  watch: {
    // 监控classList数据变化
    classList () {
      if (this.classList.length === 0) {
        this.imgUrl = 'https://chsdemo.chsvision.com/res/images/tvplus/202203/976d95bb64697g25bef4.png'
      } else {
        this.imgUrl = '/res' + this.classList[0].poster1
      }
      this.$refs.header.style.setProperty(
        '--bcColor',
        `url('${this.imgUrl}') no-repeat center center`
      )
    },

    $route () {
      this.getBreadcrumb()
    },

    // 每页展示数据发生变化时的操作
    totalPage (newValue, oldValue) {
      if (newValue > 1) {
        this.pageShow = true
      } else {
        this.pageShow = false
      }
    }
  },

  created () {
    this.getBreadcrumb()
  },

  mounted () {
    // 初始化当前分类Id和标题
    if (this.id) {
      this.choose = this.title
      this.currentId = this.id
    }
    // 判断是否是点击搜索传递跳转过来的
    if (this.data) {
      this.classList = this.data.list
      this.total = this.data.count
      this.totalPage = this.data.totalPage
      this.pageNo = this.data.pageNo
      this.state = 'search'
      if (this.classList.length > 0) this.show = false
    } else {
      // 单击更多跳转过来
      this.getData(this.currentId)
    }
  },

  methods: {
    // 定义面包屑数据
    getBreadcrumb () {
      this.breadList = []
      // this.breadList.push({ name: 'home', path: '/', meta: { title: '首页' } })
      this.name = this.$route.name
      this.$route.matched.forEach((item) => {
        this.breadList.push(item)
      })
    },

    // 定义每页显示页数时的逻辑
    onShowSizeChange (pageNo, pageSize) {
      this.pageSize = pageSize
      this.getData(this.currentId)
    },

    // 切换分类
    go (choose, id) {
      this.state = 'more'
      this.pageNo = 1
      this.inputPage = 1
      this.choose = choose
      this.currentId = id
      this.getData(id)
    },

    // 向后台请求当前分类的数据
    async getData (id) {
      // 从分页触发事件时用到判断
      this.classList = []
      this.load = true
      this.show = false
      let data = null
      if (this.state === 'more') {
        data = await getDetails(id, this.pageNo, this.pageSize)
        console.log(data)
      } else {
        data = this.search(this.keyword, this.pageNo, this.pageSize).data
        console.log(data)
      }
      this.load = false
      this.total = data.count
      this.totalPage = data.totalPage
      this.pageNo = data.pageNo
      this.classList = data.list
      if (this.classList.length > 0) {
        this.show = false
      } else {
        this.show = true
      }
    },

    // 搜索
    async search (keyword) {
      this.classList = []
      this.state = 'search'
      this.choose = '全部'
      this.keyword = keyword
      this.load = true
      this.show = false
      const params = { keyword: this.keyword, pageNo: this.pageNo, pageSize: this.pageSize }
      const data = await getSearch(params)
      this.load = false
      this.total = data.data.count
      this.totalPage = data.data.totalPage
      this.pageNo = data.data.pageNo
      this.classList = data.data.list
      if (this.classList.length > 0) {
        this.show = false
      } else {
        this.show = true
      }
    },

    // 分页器切换页面的逻辑
    pageChange () {
      this.getData(this.currentId)
    },

    // 快捷分页上一页
    prev () {
      this.pageNo -= 1
      this.getData(this.currentId)
    },

    // 快捷分页下一页
    next () {
      this.pageNo += 1
      this.getData(this.currentId)
    },

    // 快捷分页跳转指定页
    jumpToPage () {
      this.pageNo = this.inputPage * 1
      this.getData(this.currentId)
    }
  }
}
</script>

<style lang="less"  scoped >
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
  position: relative;
  margin: -1rem auto 0 auto;
  width: 120rem;
  height: 13.625rem;
  background: var(--bcColor);
  background-size: 100% auto;

  .fillter-blur {
    position: relative;
    width: 100%;
    height: 13.625rem;
    z-index: 1;
  }

  .fillter-blur::before {
    content: "";
    width: 100%;
    height: 14.375rem;
    z-index: -1;
    display: block;
    position: absolute;
    top: -0.3125rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bcColor);
    background-size: 100% auto;
    filter: blur(0.625rem);
  }

  .masking {
    width: 100%;
    height: 13.625rem;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #000000;
    opacity: 0.3;
    z-index: 3;
  }

  .breadcrumb {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    font-size: 1.125rem;
    z-index: 20;

    /deep/ .ant-breadcrumb-separator {
      color: #fff;
    }

    a {
      color: rgba(255, 255, 255, 0.65);
    }

    span {
      color: #fff;
    }
  }
}

.detail {
  position: relative;
  width: 73.5rem;
  margin: 0 auto;

  .class-menu {
    margin-top: -1.25rem;

    .title {
      position: relative;
      top: -5.625rem;
      margin-bottom: 0;
      width: 73.5rem;
      font-size: 1.875rem;
      font-weight: 700;
      color: #fff;
      z-index: 10;
    }

    .class-list {
      position: relative;
      width: 73.5rem;
      height: 5.5rem;
      margin-top: -3.9375rem;
      line-height: 5.5rem;
      background-color: #ffffff;
      border-radius: 1rem;
      z-index: 40;

      .element {
        display: inline-block;
        list-style: none;
        color: #202020;
        margin-right: 1.5rem;
        font-size: 1rem;
        cursor: pointer;
      }

      .element:hover {
        // border-bottom: .125rem solid #3ec29c;
        font-weight: 700;
        color: #3ec29c !important;
      }
    }
  }
}

.class-choose {
  border-bottom: 0.125rem solid #3ec29c;
  font-weight: 700;
  color: #3ec29c !important;
}

.class-detail {
  display: flex;
  margin-top: 1.5rem;
  width: 75rem;
  flex-flow: wrap;

   /deep/ .show {
    display: flex;
    width: 25rem;
    color: #3ec29c !important;
    min-height: 37.5rem;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  .detail-item {
    margin-bottom: 1.5rem;
    margin-right: 1.5rem;
  }
}

.components-pagination {
  margin-top: 1.5rem;
  text-align: center;
}

.page {
  display: flex;
  justify-content: flex-end;
  letter-spacing: 0.125rem;
  align-items: center;
  margin: 2rem 0;

  input {
    width: 3.125rem;
    height: 2rem;
    padding: 0.375rem 1.3125rem;
    margin: 0 0.5rem;
    border: 0.0625rem solid #d9d9d9;
    font-size: 0.875rem;
    line-height: 0.75rem;
    outline: none;
    background: #fff;
  }

  input::placeholder {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.25);
  }

  button {
    width: 2rem;
    height: 2rem;
    margin: 0 0.25rem;
    font-size: 1.25rem;
    color: #3ec29c;
    border: none;
    background-size: 2rem 2rem;
  }

  .btn-prev {
    background-image: url("@/static/images/button_next@2x(1).png");
  }

  .btn-next {
    background-image: url("@/static/images/button_next@2x.png");
  }

  .btn-prev:hover {
    background-image: url("@/static/images/button_next@2x(2).png");
  }

  .btn-next:hover {
    background-image: url("@/static/images/button_next@2x(3).png");
  }
}
</style>>
