import vuex from 'vuex'

import uac from './modules/uac'
import product from './modules/product'

export const store = new vuex.Store({
  strict: false,
  modules: {
    uac,
    product
  }
})
