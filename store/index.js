import vuex from 'vuex'

import category from './modules/category'
import product from './modules/product'
import uac from './modules/uac'

export const store = new vuex.Store({
  strict: false,
  modules: {
    category,
    product,
    uac
  }
})
