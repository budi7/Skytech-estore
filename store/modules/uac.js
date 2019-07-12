// gql's import
import apolloMutationAuthenticate from '../../gql/uac/login'
import apolloMutationRegister from '../../gql/uac/register'
import apolloMutationForgotPassword from '../../gql/uac/forgotPassword'
import apolloMutationResetPassword from '../../gql/uac/resetPassword'

const uac = {
  namespaced: true,
  state() {
    return {
      token: null,
      username: null
    }
  },
  getters: {
    isAuthed: (state) => {
      return !!state.token
    }
  },
  mutations: {
    initStore: (state) => {
      // look for prev data
      let prevData = null
      if (process.browser) {
        prevData = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null
      }

      // init value
      state.token = process.browser ? (prevData ? prevData.token : null) : null
      state.username = process.browser ? (prevData ? prevData.username : null) : null
    },
    login: (state, payload) => {
      state.token = payload.token
      state.username = payload.user.name

      localStorage.setItem('user', JSON.stringify(state))
    },
    register: (state, payload) => {
      state.username = payload.username
    },
    logout: (state, payload) => {
      state.username = null
      state.token = null
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
          commit('login', resp)
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
            username: ''
          }
        }).then((resp) => {
          if (!resp) reject(resp)
          commit('login', resp)
          resolve(resp.data.ResetPasswordWithToken)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}

export default uac
