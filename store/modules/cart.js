// import Vuex from 'vuex'
import apolloMutationAddCart from '../../gql/transaction/addCart'
import apolloMutationUpdateCart from '../../gql/transaction/setCart'
import apolloQueryMyCart from '../../gql/transaction/myCart'

// lint rules

const cart = {
  namespaced: true,
  state() {
    return {
      cart_items: [],
      cart_total_price: 0,
      cart_total_item: 0,
      cart_id: '',
      cart_currency: 'IDR',
      cart_checkout_id: null,
      cart_checkout: [],
      courier: [],
      tenant: null
    }
  },
  getters: {
    cartItem(state) {
      return (productCode) => {
        // console.log(productCode)
        // eslint-disable-next-line camelcase
        const idx = state.cart_items.map(function (data) { return data.product_code }).indexOf(productCode)
        return state.cart_items[idx]
      }
    },
    cartItems: (state) => {
      return state.cart_items
    },
    cartItemsCount: (state) => {
      return state.cart_items.length
    },
    isOnCart: (state, productCode) => {
      const idx = state.cart_items.map(function (data) { return data.product_code }).indexOf(productCode)
      // eslint-disable-next-line no-unneeded-ternary
      return idx < 0 ? true : false
    },
    totalPriceCart: (state) => {
      if (state.cart_items.length === 0) return 0
      return state.cart_items.reduce(function (acm, next) {
        return (acm + (next.qty * (next.product.price.price - next.product.price.discount)))
      }, 0)
    }
  },
  mutations: {
    initStore: (state) => {
      // look for prev data
      if (process.browser) {
        const prevData = window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : null

        // init value
        state.cart_items = prevData ? prevData.cart_items : null
      }
    },
    cartUpdate: (state, payload) => {
      const isNewOnCart = (upc) => {
        if (!state.cart_items.length === 0) return false
        return state.cart_items.map(function (data) { return data.upc }).indexOf(upc)
      }

      if (state.cart_items.length > 0) {
        // if cart not empty
        const idx = isNewOnCart(payload.product.upc)

        if (idx >= 0) {
          // if cart have previous
          state.cart_items.splice(idx, 1, {
            'upc': payload.product.upc,
            'medias': payload.product.medias,
            'name': payload.product.name,
            'price': payload.product.price,
            'qty': payload.qty
          })
        } else {
          // if cart have no previous
          state.cart_items.push({
            'upc': payload.product.upc,
            'medias': payload.product.medias,
            'name': payload.product.name,
            'price': payload.product.price,
            'qty': payload.qty
          })
        }
      } else {
        // if cart empty
        state.cart_items.push({
          'upc': payload.product.upc,
          'medias': payload.product.medias,
          'name': payload.product.name,
          'price': payload.product.price,
          'qty': payload.qty
        })
      }

      // store local
      if (process.browser) {
        window.localStorage.setItem('cart', JSON.stringify(state))
      }
    },
    cartFetch: (state, payload) => {
      state.cart_items = payload

      if (process.browser) {
        window.localStorage.setItem('cart', JSON.stringify(state))
      }
    },
    cartReset: (state) => {
      state.cart_items = []
    },
    countCartTotal: (state) => {
      state.cart_total_price = state.cart_items.reduce(function (acm, next) {
        return (acm + (next.qty * (next.price.price - next.price.discount)))
      }, 0)
    },
    countCart: (state) => {
      state.cart_total_item = state.cart_items.reduce(function (acm, next) {
        return (acm + next.qty)
      }, 0)
    }
  },
  actions: {
    cartItemAdd: ({ commit, state }, payload) => {
      // check if item previously added
      // console.log(payload.data)
      // var idx = state.cart_items.findIndex(x => x.upc === payload.data.upc)
      // console.log(state.cart_items[idx].kuantitas)
      // if (idx >= 0) payload.data.kuantitas = state.cart_items[idx].kuantitas + 1

      // send cart
      return new Promise((resolve, reject) => {
        payload.apolloClient.mutate({
          // Query
          mutation: apolloMutationAddCart,

          // Parameters
          variables: {
            product_code: payload.data.upc,
            qty: payload.data.qty
          }
        }).then((resp) => {
          // error ?
          if (resp.error) reject(resp.errors)

          commit('cartUpdate', resp.data.AddToMyCart)
          commit('countCart')
          commit('countCartTotal')

          resolve(resp.data.AddToMyCart)
        }).catch((error) => {
          console.log(error)
          reject(error)
        })
      })
    },
    cartUpdate: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.mutate({
          // Query
          mutation: apolloMutationUpdateCart,

          // Parameters
          variables: {
            product_code: payload.data.upc,
            qty: payload.data.qty
          }
        }).then((resp) => {
          // error ?
          if (resp.error) reject(resp.errors)
          commit('cartUpdate', resp.data.SetMyCart)
          resolve(resp.data.Cart)
        }).catch((error) => {
          console.log(error)
          reject(error)
        })
      })
    },
    cartFetch: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.mutate({
          // Query
          mutation: apolloQueryMyCart,

          // Parameters
          variables: {}
        }).then((resp) => {
          // error ?
          if (resp.errors) reject(resp.errors)

          commit('cartUpdate', resp.data.MyCart)
          commit('countCart')
          commit('countCartTotal')

          resolve(resp.data.MyCart)
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
      })
    }
  }
}

export default cart
