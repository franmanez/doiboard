import { createStore } from 'vuex'

export default createStore({
  state: {
    pageSize: 10,
    memberName: '',
  },
  getters: {
    pageSize: state => state.pageSize,
    memberName: state => state.memberName,
  },
  mutations: {
    setPageSize (state, size) {
      state.pageSize = size
    },

    setMemberName (state, name) {
      state.memberName = name
    },
  },
  actions: {
  },
  modules: {
  }
})
