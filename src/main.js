import Vue from 'vue'
import App from './App.vue'
// import 'ant-design-vue/dist/antd.less'
import { Card, BackTop, Pagination, Layout, ConfigProvider, Tabs, PageHeader, Empty, Breadcrumb, Spin, Affix, Checkbox, Button, message } from 'ant-design-vue' // 引入组件，但不用引入样式
import VueAwesomeSwiper from 'vue-awesome-swiper'
import router from './router'
import store from './store'
import 'swiper/css/swiper.css'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

Vue.use(preview)
Vue.config.productionTip = false
Vue.use(Card).use(BackTop).use(Pagination)
  .use(Layout).use(ConfigProvider).use(Tabs)
  .use(PageHeader).use(Empty).use(Breadcrumb)
  .use(Spin).use(Affix).use(Checkbox).use(Button)
Vue.prototype.$message = message
Vue.use(VueAwesomeSwiper)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
