<template>
  <div>
    <headerBar />

    <div class="container after-nav">
      <h1>Produk</h1>
    </div>

    <FooterBar />
  </div>
</template>

<script>
// page components
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'

export default {
  components: {
    HeaderBar,
    FooterBar
  }
}
</script>

<style>

</style>
