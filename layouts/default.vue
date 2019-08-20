<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  beforeCreate() {
    // init all sessions
    this.$store.commit('modules/uac/initStore')
    this.$store.commit('modules/cart/initStore')
    this.$store.commit('modules/wishlist/initStore')
  }
}
</script>

<style>
</style>
