<template>
  <div>
    <headerBar />

    <div class="container after-nav">
      <div class="row">
        <div class="col-12 pt-4 pb-5">
          <h1 class="title">
            Download Aplikasi Skytech
          </h1>
        </div>
      </div>
    </div>

    <footerBar />
  </div>
</template>

<script>
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'

export default {
  components: {
    HeaderBar,
    FooterBar
  }
}
</script>

<style scoped>

</style>
