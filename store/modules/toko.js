import apolloListToko from '~/gql/shipping/storeList'
import apolloCheckStock from '~/gql/shipping/checkStock'

const toko = {
  namespaced: true,
  state() {
    return {
      list: [],
      selected: null
    }
  },
  getters: {
    getSelectedToko: (state) => {
      if (state.selected === null) return []
      return state.list[state.selected]
    }
  },
  mutations: {
    fetch: (state, payload) => {
      state.list = payload
    },
    select: (state, payload) => {
      state.selected = payload
    }
  },
  actions: {
    fetch: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.query({
          // Query
          query: apolloListToko,

          // Parameters
          variables: {}
        }).then((resp) => {
          // error ?
          if (resp.errors) reject(resp.errors)

          commit('fetch', resp.data.Organizations.data)

          resolve(resp.data.Organizations.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    checkStock: ({ commit, state }, payload) => {
      console.log(payload)
      return new Promise((resolve, reject) => {
        payload.apolloClient.query({
          // Query
          query: apolloCheckStock,

          // Parameters
          variables: {
            products: payload.data.products
          }
        }).then((resp) => {
          // error ?
          if (resp.errors) reject(resp.errors)

          // console.log(resp)
          // commit('fetch', resp.data.Stock.data)

          resolve(resp.data.Stock)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}

export default toko
