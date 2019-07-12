import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
    /* your options */
      // modules: ['uac']
      // modules: ['product']
      // reducer: state => ({ product: state.modules.product.products })
      // filter: mutation => ({ product: state.modules.product.products })
    }).plugin(store)
  })
}
