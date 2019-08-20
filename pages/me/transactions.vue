<template>
  <div>
    <headerBar />

    <Layout active-index="riwayat_pembelian">
      <h4 class="mt-3 mb-3">
        Riwayat Pembelian
      </h4>
    </Layout>

    <footerBar />
  </div>
</template>

<script>
import Layout from './components/layout'
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'

export default {
  components: {
    HeaderBar,
    FooterBar,
    Layout
  }
}
</script>

<style>

</style>
