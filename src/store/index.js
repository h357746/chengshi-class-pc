import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    category: [{ title: '全部', id: '5225120585127936' }] // 栏目列表
  },
  getters: {
    category (state) {
      return state.category
    }
  },
  mutations: {
    setCategory (state, payload) {
      state.category = [...state.category, ...payload]
    }
  },
  actions: {
    pathCategory (content, payload) {
      if (content.state.category.length === 1) {
        sessionStorage.setItem('category', JSON.stringify(payload))
        content.commit('setCategory', payload)
      }
    }
  },
  modules: {
  }
})
