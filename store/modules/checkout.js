// import Vuex from 'vuex'

// lint rules
const cart = {
  namespaced: true,
  state() {
    return {
      items: [],
      shipping_method: null,
      courier: [],
      store: [],
      address: []
    }
  },
  getters: {

  },
  mutations: {
    initStore: (state, payload) => {
      if (process.browser) {
        const prevData = window.localStorage.getItem('checkout') ? JSON.parse(window.localStorage.getItem('checkout')) : null

        // init value
        if (prevData) {
          state.items = prevData.items.length > 0 ? prevData.items : payload
        } else {
          state.items = payload
        }
        // check
        if (!state.items) state.items = []

        // assign
        state.shipping_method = prevData ? prevData.shipping_method : null
        state.courier = prevData ? prevData.courier : null
        state.store = prevData ? prevData.store : null
        state.address = prevData ? prevData.address : null
      }
    },
    setShippingMethod: (state, payload) => {
      console.log(payload)
      state.shipping_method = payload

      // store local
      if (process.browser) window.localStorage.setItem('checkout', JSON.stringify(state))
    }
  },
  actions: {
  }
}

export default cart
