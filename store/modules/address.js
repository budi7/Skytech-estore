import apolloQueryMyShippingAddress from '../../gql/shipping/myShippingAddress'

const address = {
  namespaced: true,
  state() {
    return {
      list: [],
      sellectedAddress: null,
      localData: [],
      onlineData: []
    }
  },
  getters: {
    getSelectedAddress: (state) => {
      if (state.sellectedAddress === null) return []
      return state.list[state.sellectedAddress]
    }
  },
  mutations: {
    init: (state) => {
      // load from local session
      if (process.browser) {
        const prevData = window.localStorage.getItem('address') ? JSON.parse(window.localStorage.getItem('address')) : []
        state.localData = prevData
        state.list = state.onlineData.concat(state.localData)
      }

      state.sellectedAddress = null
    },
    add: (state, payload) => {
      // store payload into firs local array
      state.localData.unshift(payload)

      // update
      state.list = state.onlineData.concat(state.localData)

      // select new added value
      state.sellectedAddress = state.list.length - state.localData.length

      // save local session
      if (process.browser) {
        window.localStorage.setItem('address', JSON.stringify(state.localData))
      }
    },
    select: (state, payload) => {
      state.sellectedAddress = payload
    },
    remove: (state) => {
      // remove at local storage
      const th = state.list.length - state.localData.length
      if (state.sellectedAddress >= th) {
        state.list.splice(state.sellectedAddress, 1)
      }

      // update
      state.list = state.onlineData.concat(state.localData)

      // save local session
      if (process.browser) {
        window.localStorage.setItem('address', JSON.stringify(state.localData))
      }
    },
    reset: (state) => {
      state.list = []
      state.sellectedAddress = null
      state.localData = []
      state.onlineData = []

      // save local session
      if (process.browser) {
        window.localStorage.removeItem('address')
      }
    },
    fetch: (state, payload) => {
      const oldOnlineDataLength = state.onlineData.length

      // merge onlineData and local data to list
      state.onlineData = payload
      state.list = state.onlineData.concat(state.localData)

      // check any length change
      if (state.onlineData.length !== oldOnlineDataLength) {
        if (state.sellectedAddress) {
          state.sellectedAddress = (state.onlineData.length - oldOnlineDataLength) + state.sellectedAddress
        }
      }
    }
  },
  actions: {
    fetch: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.query({
          // Query
          query: apolloQueryMyShippingAddress,

          // Parameters
          variables: {}
        }).then((resp) => {
          // error ?
          if (resp.errors) reject(resp.errors)

          const tmp = resp.data.CheckMyShippingAddress.map(function (data) {
            let addr = {}

            try {
              addr = data.receiver_address ? JSON.parse(data.receiver_address) : []
            } catch (error) {
              addr = {
                address: data.receiver_address.address,
                city: data.receiver_address.city,
                country: data.receiver_address.country,
                province: data.receiver_addressprovince,
                zip_code: data.receiver_address.zip_code
              }
            }
            return {
              receiver_name: data ? data.receiver_name : null,
              receiver_phone: data ? data.receiver_phone : null,
              receiver_address: {
                address: addr.address,
                city: addr.city,
                province: addr.province,
                zip_code: addr.zip_code,
                country: addr.country
              }
            }
          })

          commit('fetch', tmp)

          resolve(tmp)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}

export default address
