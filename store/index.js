import vuex from 'vuex'

import address from './modules/address'
import category from './modules/category'
import product from './modules/product'
import toko from './modules/toko'
import uac from './modules/uac'
import wishlist from './modules/wishlist'

export const store = new vuex.Store({
  strict: false,
  modules: {
    address,
    category,
    product,
    toko,
    uac,
    wishlist
  }
})
