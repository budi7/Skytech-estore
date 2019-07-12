// import Vuex from 'vuex'
import apolloMutationAddCart from '../../gql/transaction/addCart'

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
  getters() {

  },
  mutations: {
    cartUpdate: (state, payload) => {
      console.log(payload)
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
            product_code: payload.upc,
            qty: payload.qty
          }
        }).then((resp) => {
          // error ?
          if (resp.error) reject(resp.error)
          commit('cartUpdate', resp.data.AddToMyCart)
          console.log(resp)
          resolve(resp.data.Cart)
        }).catch((error) => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
}

export default cart
