// import Vuex from 'vuex'
import apolloQueryCategories from '../../gql/product/categories'

const product = {
  namespaced: true,
  state() {
    return {
      categories: []
    }
  },
  getters: {
    isCategoryPrefetched: (state) => {
      return state.categories.length > 0 || false
    },
    isCategoryEmpty: (state) => {
      return state.categories ? (state.categories.length > 0 || true) : true
    }
  },
  mutations: {
    initStore: (state) => {
      // look for prev data
      if (process.browser) {
        const prevData = window.localStorage.getItem('category') ? JSON.parse(window.localStorage.getItem('category')) : null

        // init value
        state.categories = prevData ? (prevData.categories ? prevData.categories : []) : []
      }
    },
    fetchCategories: (state, payload) => {
      state.categories = payload
      if (process.browser) {
        window.localStorage.setItem('category', JSON.stringify(state))
      }
    }
  },
  actions: {
    fetchCategories: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.query({
          query: apolloQueryCategories,
          variables: {}
        }).then((resp) => {
          if (resp.errors) reject(resp.errors)
          console.log(resp)
          commit('fetchCategories', resp.data.Categories.data)
          resolve(resp.data.Categories.data)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}

export default product
