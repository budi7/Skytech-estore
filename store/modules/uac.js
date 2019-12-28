// gql's import
import apolloMutationAuthenticate from '../../gql/uac/login'
import apolloMutationRegister from '../../gql/uac/register'
import apolloMutationForgotPassword from '../../gql/uac/forgotPassword'
import apolloMutationResetPassword from '../../gql/uac/resetPassword'
import apolloUpdatePassword from '~/gql/profile/updatePassword'
import apolloUpdateProfile from '~/gql/profile/updateProfile'

const uac = {
  namespaced: true,
  state() {
    return {
      token: null,
      username: null,
      name: null,
      profile: {},
      customer_id: null
    }
  },
  getters: {
    isAuthed: (state) => {
      return !!state.token
    },
    isProfileDataCompleted: (state) => {
      if (!state.profile || state.profile.length === 0) return false
      if (!state.profile.email) return false
      if (!state.profile.address) return false
      if (!state.profile.whatsapp) return false
      if (!state.customer_id) return false

      return true
    }
  },
  mutations: {
    initStore: (state) => {
      // look for prev data
      let prevData = null
      if (process.client) {
        prevData = window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : null

        // init value
        state.token = (prevData ? prevData.token : null)
        state.username = (prevData ? prevData.username : null)
        state.name = (prevData ? prevData.name : null)
        state.profile = (prevData ? prevData.profile : {})
        state.customer_id = (prevData ? prevData.customer_id : null)
      }
    },
    login: (state, payload) => {
      state.token = payload.token
      state.username = payload.user.username
      state.name = payload.user.customer.name
      state.profile = payload.user.customer
      state.customer_id = payload.user.customer_id

      if (process.client) {
        sessionStorage.setItem('user', JSON.stringify(state))
      }
    },
    register: (state, payload) => {
      state.username = payload.username
    },
    updateProfile: (state, payload) => {
      state.name = payload.name
      state.profile = payload

      if (process.client) {
        sessionStorage.setItem('user', JSON.stringify(state))
      }
    },
    logout: (state, payload) => {
      state.username = null
      state.token = null

      if (process.client) {
        sessionStorage.setItem('user', JSON.stringify(state))
      }
    }
  },
  actions: {
    login: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.mutate({
          mutation: apolloMutationAuthenticate,
          variables: {
            username: payload.data.username,
            password: payload.data.password
          }
        }).then((resp) => {
          if (resp.errors) reject(resp.errors)
          commit('login', resp.data.Authenticate)
          resolve(resp.data.Authenticate)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    register: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.mutate({
          mutation: apolloMutationRegister,
          variables: {
            name: payload.data.name,
            username: payload.data.username,
            password: payload.data.password
          }
        }).then((resp) => {
          if (resp.errors) reject(resp.errors)
          commit('register', resp.data.Register)
          resolve(resp.data.Register)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    forgotPassword: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.mutate({
          mutation: apolloMutationForgotPassword,
          variables: {
            username: payload.data.username
          }
        }).then((resp) => {
          if (!resp) reject(resp)
          commit('login', { token: '', user: { username: payload.data.username, customer: { name: '' }, customer_id: '' } })
          resolve(resp.data.RequestResetPasswordToken)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    resetPassword: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.mutate({
          mutation: apolloMutationResetPassword,
          variables: {
            token: payload.data.token,
            password: payload.data.password,
            username: payload.data.username
          }
        }).then((resp) => {
          if (!resp) reject(resp)
          commit('login', { token: '', user: { username: payload.data.username, customer: { name: '' }, customer_id: '' } })
          resolve(resp.data.ResetPasswordWithToken)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    updatePassword: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.mutate({
        // Query
          mutation: apolloUpdatePassword,

          // Parameters
          variables: {
            old_password: payload.data.old_password,
            new_password: payload.data.new_password
          }
        }).then((resp) => {
          if (resp.errors) reject(resp.errors)
          resolve(resp.data.ResetPasswordWithToken)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    updateProfile: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.mutate({
        // Query
          mutation: apolloUpdateProfile,

          // Parameters
          variables: {
            id: payload.data.id,
            name: payload.data.name,
            address: payload.data.address,
            whatsapp: payload.data.whatsapp,
            email: payload.data.email
          }
        }).then((resp) => {
          if (resp.errors) reject(resp.errors)
          commit('updateProfile', resp.data.StoreCustomer)
          resolve(resp.data.StoreCustomer)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}

export default uac
