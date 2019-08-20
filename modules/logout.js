export function logout(vm) {
  if (!vm) { return }

  // do logout
  vm.$apolloHelpers.onLogout()
  vm.$store.commit('modules/uac/logout')
  vm.$store.commit('modules/cart/cartReset')
  vm.$store.commit('modules/wishlist/wishlistReset')
  vm.$store.commit('modules/address/reset')
}
