import Vue from 'vue'
import VueRouter from 'vue-router'
import MyContent from '@/pages/Content.vue'
import HomeView from '@/pages/Home.vue'
import ClassDetails from '@/pages/ClassDetails.vue'
import Login from '@/pages/Login.vue'
import PlayVideo from '@/components/Player.vue'
import store from '@/store'
import { getSessionStorage } from '@/utils/storage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/home',
    meta: { title: '首页', showInbreadcrumb: true },
    children: [
      {
        path: '/home',
        name: 'MyContent',
        component: MyContent,
        props: true
      },
      {
        path: '/details/:id',
        name: 'details',
        component: ClassDetails,
        props: true,
        // query: {
        //   t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        // },
        meta: { title: '分类', showInbreadcrumb: true }
      },
      {
        path: '/paly/:id',
        name: 'play',
        component: PlayVideo,
        props: true,
        meta: { title: '播放页', showInbreadcrumb: true }
      }

    ]
  }

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = getSessionStorage('token') // 取出token
  if (token != null) {
    if (to.name === 'login') {
      next('/')
    } else {
      const category = getSessionStorage('category')
      if (category && store.state.category.length === 1) {
        store.dispatch('pathCategory', category)
      }
      next()
    }
  } else {
    if (to.name === 'login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
