// import Vuex from 'vuex'
import apolloQueryCategories from '../../gql/product/categories'
import apolloQueryProducts from '../../gql/product/product'

const product = {
  namespaced: true,
  state() {
    return {
      categories: [],
      products: [],
      product_category: null,
      product_orderBy: null,
      product_orderDesc: null,
      product_brand: null,
      product_price_start: 0,
      product_price_end: 0,
      product_name: null,
      product_search: null,
      product_search_mode: null,
      product_next_page: 1,
      product_hasMorePages: false,
      product_detailId: null,
      product_detailData: []
    }
  },
  getters: {
    isProductPrefetched: (state) => {
      return state.products.length > 0 || false
    }
  },
  mutations: {
    fetchCategories: (state, payload) => {
      state.categories = payload
    },
    fetchProducts: (state, payload) => {
      // set data
      if (!payload.override) {
        if (state.products.length === 0) {
          state.products = payload.data.data
        } else {
          payload.data.data.map((x) => {
            state.products.push(x)
          })
        }
      } else {
        state.products = payload.data.data
      }
    },
    setFilters: (state, payload) => {
      state.product_search = payload
    },
    setSort: (state, payload) => {
      state.product_search = payload
    },
    setSearch: (state, payload) => {
      state.product_search = payload
    },
    setPagination: (state, payload) => {
      state.product_hasMorePages = payload.has_more_pages
      // console.log(payload.has_more_pages)
      if (payload.has_more_pages) state.product_next_page = payload.current_page + 1
      // console.log(state.product_next_page)
    },
    fetchProductDetail: (state, payload) => {
      console.log(payload)
    },
    resetProduct: (state) => {
      state.products = []
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
          commit('fetchCategories', resp.data.Categories.data)
          resolve(resp.data.Categories.data)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    initProduct: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.query({
          query: apolloQueryProducts,
          variables: {
            page: 1,
            orderBy: payload.data.sort.orderBy,
            orderDesc: payload.data.sort.orderDesc
          }
        }).then((resp) => {
          // commit product
          commit('fetchProducts', {
            data: resp.data.Products,
            override: true
          })

          // commit search
          commit('setSearch', payload.search)

          // commit filters
          commit('setFilters', payload.filter)

          // commit sorting
          commit('setSort', payload.sort)

          // commit pagination
          commit('setPagination', resp.data.Products)

          resolve(resp.data.Products)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    nextPageProduct: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.query({
          query: apolloQueryProducts,
          variables: {
            page: state.product_next_page,
            orderBy: state.product_orderBy,
            orderDesc: state.product_orderDesc
          }
        }).then((resp) => {
          // commit product
          commit('fetchProducts', {
            data: resp.data.Products,
            override: false
          })

          // commit search
          commit('setSearch', payload.search)

          // commit filters
          commit('setFilters', payload.filter)

          // commit sorting
          commit('setSort', payload.sort)

          // commit pagination
          commit('setPagination', resp.data.Products)

          resolve(resp.data.Products)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    fetchProductDetail: ({ commit, state }, payload) => {
      return new Promise((resolve, reject) => {
        payload.apolloClient.query({
          query: apolloQueryProducts,
          variables: {
            id: payload.data.id
          }
        }).then((resp) => {
          if (resp.errors) reject(resp.errors)
          // commit('fetchProductDetail', resp.data.Products.data[0])
          resolve(resp.data.Products.data[0])
        }).catch((error) => {
          reject(error)
        })
      })
    }
    // fetchProducts: ({ commit, state }, payload) => {
    //   return new Promise((resolve, reject) => {
    //     payload.apolloClient.query({
    //       query: apolloQueryProducts,
    //       variables: {
    //         page: payload.data.page
    //       }
    //     }).then((resp) => {
    //       if (resp.errors) reject(resp.errors)
    //       commit('fetchProducts', {
    //         data: resp.data.Products,
    //         override: payload.data.override || false
    //       })
    //       resolve(resp.data.Products)
    //     }).catch((error) => {
    //       reject(error)
    //     })
    //   })
    // }
  }
}

export default product
