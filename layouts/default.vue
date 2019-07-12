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
  }
}
</script>

<style>
</style>
