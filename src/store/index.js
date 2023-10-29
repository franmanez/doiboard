import { createStore } from 'vuex'

export default createStore({
  state: {
    pageSize: 10,
  },
  getters: {
    pageSize: state => state.pageSize,
  },
  mutations: {
    setPageSize (state, size) {
      state.pageSize = size
    },
  },
  actions: {
  },
  modules: {
  }
})
