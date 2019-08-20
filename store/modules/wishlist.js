// import Vuex from 'vuex'
import apolloMutationAddWishlist from '../../gql/transaction/addWishlist'
import apolloQueryMyWishlist from '../../gql/transaction/myWishlist'

// lint rules
const wishlist = {
  namespaced: true,
  state() {
    return {
      wishlist_items: []
    }
  },
  getters: {

  },
  mutations: {
    initStore: (state) => {
      // look for prev data
      if (process.browser) {
        const prevData = window.localStorage.getItem('wishlist') ? JSON.parse(window.localStorage.getItem('wishlist')) : null

        // init value
        state.wishlist_items = prevData ? (prevData.wishlist_items ? prevData.wishlist_items : []) : []
      }
    },
    wishlistAdd: (state, payload) => {
      state.wishlist_items.push({
        'upc': payload.product.upc,
        'medias': payload.product.medias,
        'name': payload.product.name,
        'price': payload.product.price
      })

      // store local
      if (process.browser) {
        window.localStorage.setItem('wishlist', JSON.stringify(state))
      }
    },
    wishlistRemove: (state, payload) => {
      // cari index dari payload
      const idx = state.wishlist_items.map(function (data) { return data.upc }).indexOf(payload.product_code)

      // remove : pop
      state.wishlist_items.splice(idx, 1)

      // store local
      if (process.browser) {
        window.localStorage.setItem('wishlist', JSON.stringify(state))
      }
    },
    wishlistFetch: (state, payload) => {
      state.wishlist_items = payload.map((dt) => {
        return dt.product
      })

      // store local
      if (process.browser) {
        window.localStorage.setItem('wishlist', JSON.stringify(state))
      }
    },
    wishlistReset: (state) => {
      state.wishlist_items = []

      // store local
      if (process.browser) {
        window.localStorage.setItem('wishlist', JSON.stringify(state))
      }
    }
  },
  actions: {
    itemAdd: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.mutate({
          // Query
          mutation: apolloMutationAddWishlist,

          // Parameters
          variables: {
            product_code: payload.data.upc,
            is_add: true
          }
        }).then((resp) => {
          // error ?
          if (resp.error) reject(resp.errors)
          commit('wishlistAdd', resp.data.ToggleWishlist)
          resolve(resp.data.ToggleWishlist)
        }).catch((error) => {
          console.log(error)
          reject(error)
        })
      })
    },
    itemRemove: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.mutate({
          // Query
          mutation: apolloMutationAddWishlist,

          // Parameters
          variables: {
            product_code: payload.data.upc,
            is_add: false
          }
        }).then((resp) => {
          // error ?
          if (resp.error) reject(resp.errors)
          commit('wishlistRemove', resp.data.ToggleWishlist)
          resolve(resp.data.ToggleWishlist)
        }).catch((error) => {
          console.log(error)
          reject(error)
        })
      })
    },
    fetch: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.query({
          // Query
          query: apolloQueryMyWishlist,

          // Parameters
          variables: {}
        }).then((resp) => {
          if (resp.errors) reject(resp.errors)
          commit('wishlistFetch', resp.data.MyWishlist.data)
          resolve(resp.data.MyWishlist.data)
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
      })
    }
  }
}

export default wishlist
