import { createStore } from 'vuex'

export default createStore({
  state: {
    pageSize: 10,
    memberName: '',
    prefix: ''
  },
  getters: {
    pageSize: state => state.pageSize,
    memberName: state => state.memberName,
    prefix: state => state.prefix,
  },
  mutations: {
    setPageSize (state, size) {
      state.pageSize = size
    },

    setMemberName (state, name) {
      state.memberName = name
    },

    setPrefix (state, value) {
      state.prefix = value
    },
  },
  actions: {
  },
  modules: {
  }
})
