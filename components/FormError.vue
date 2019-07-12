<template>
  <div v-show="msg" class="pt-1">
    <p v-for="(err,i) in msg" :key="i" class="text-danger small mb-0">
      {{ err }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      default: function () { return [] },
      type: Array
    }
  }
}
</script>

<style>

</style>
