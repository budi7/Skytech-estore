// import Vuex from 'vuex'
import apolloMutationAddCart from '../../gql/transaction/addCart'
import apolloMutationUpdateCart from '../../gql/transaction/setCart'
import apolloQueryMyCart from '../../gql/transaction/myCart'
import apolloMutationRemoveCartAddWishlit from '../../gql/transaction/removeCartAddWishlit'

// lint rules
const cart = {
  namespaced: true,
  state() {
    return {
      cart_items: [],
      cart_total_price: 0,
      cart_total_item: 0,
      cart_id: '',
      cart_currency: 'IDR'
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
      return state.cart_total_price
    }
  },
  mutations: {
    initStore: (state) => {
      // look for prev data
      if (process.browser) {
        const prevData = window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : null

        // init value
        state.cart_items = prevData ? (prevData.cart_items ? prevData.cart_items : []) : []
        state.cart_total_price = prevData ? prevData.cart_total_price : null
        state.cart_total_item = prevData ? prevData.cart_total_item : null
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
          // check if has qty
          if (payload.qty === 0) {
            // remove prev item
            state.cart_items.splice(idx, 1)
          } else {
            // update cerrent item
            state.cart_items.splice(idx, 1, {
              'upc': payload.product.upc,
              'medias': payload.product.medias,
              'name': payload.product.name,
              'price': payload.product.price,
              'qty': payload.qty
            })
          }
        } else {
          // if cart have no previous
          // check if has qty
          if (payload.qty === 0) return

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
        // check if has qty
        if (payload.qty === 0) return

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
      if (payload.length === 0) {
        state.cart_items = []
        state.cart_total_price = 0
        state.cart_total_item = 0
      } else {
        state.cart_items = payload
          .filter(dt => dt.qty > 0)
          .map(function (data) {
            return {
              'upc': data.product.upc,
              'medias': data.product.medias,
              'name': data.product.name,
              'price': data.product.price,
              'qty': data.qty
            }
          })

        state.cart_total_price = state.cart_items.reduce(function (acm, next) {
          return (acm + (next.qty * (next.price.price - next.price.discount)))
        }, 0)

        state.cart_total_item = state.cart_items.reduce(function (acm, next) {
          return (acm + next.qty)
        }, 0)
      }

      if (process.browser) {
        window.localStorage.setItem('cart', JSON.stringify(state))
      }
    },
    cartReset: (state) => {
      state.cart_items = []
      state.cart_total_price = 0
      state.cart_total_item = 0

      // store local
      if (process.browser) {
        window.localStorage.setItem('cart', JSON.stringify(state))
      }
    },
    countCartTotal: (state) => {
      if (state.cart_items.length === 0) return 0

      state.cart_total_price = state.cart_items.reduce(function (acm, next) {
        return (acm + (next.qty * (next.price.price - next.price.discount)))
      }, 0)

      // store local
      if (process.browser) {
        window.localStorage.setItem('cart', JSON.stringify(state))
      }
    },
    countCart: (state) => {
      if (state.cart_items.length === 0) return 0

      state.cart_total_item = state.cart_items.reduce(function (acm, next) {
        return (acm + next.qty)
      }, 0)

      // store local
      if (process.browser) {
        window.localStorage.setItem('cart', JSON.stringify(state))
      }
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
          commit('countCart')
          commit('countCartTotal')

          resolve(resp.data.Cart)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    cartRemoveAddWishlist: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.mutate({
          // Query
          mutation: apolloMutationRemoveCartAddWishlit,

          // Parameters
          variables: {
            product_code: payload.data.upc
          }
        }).then((resp) => {
          // error ?
          if (resp.error) reject(resp.errors)
          commit('cartUpdate', resp.data.SetMyCart)
          commit('countCart')
          commit('countCartTotal')

          resolve(resp.data.ToggleWishlist)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    cartFetch: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.query({
          // Query
          query: apolloQueryMyCart,

          // Parameters
          variables: {},

          // no cache
          fetchPolicy: 'no-cache'
        }).then((resp) => {
          // error ?
          if (resp.errors) reject(resp.errors)

          commit('cartFetch', resp.data.MyCart.data)

          resolve(resp.data.MyCart)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}

export default cart
