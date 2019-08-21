<template>
  <img
    ref="img"
    class="img-fluid img"
    src="~/assets/images/base.png"
  >
</template>

<script>
export default {
  props: {
    src: {
      default: null,
      type: String
    }
  },
  mounted() {
    console.log(this.src)
  }
}
</script>
