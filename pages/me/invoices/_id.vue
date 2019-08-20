<template>
  <div>
    <headerBar />

    <Layout active-index="tagihan_pembelian">
      <h4 class="mt-3 mb-3">
        Detail Tagihan Pembelian
      </h4>
    </Layout>

    <footerBar />
  </div>
</template>

<script>
// page components
export default {
  components: {
  },
  data() {
    return {
      transaction: []
    }
  },
  asyncData({ app, store, params }) {
    // return store.dispatch('modules/product/fetchProductDetail', {
    //   apolloClient: app.apolloProvider.defaultClient,
    //   data: {
    //     id: params.id
    //   }
    // }).then((res) => {
    //   console.log(res)
    //   return {
    //     product: res
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // })
  },
  mounted() {
    // get cart
    // this.$store.commit('modules/cart/initStore')
    // const timer = setTimeout(() => {
    //   this.inCart = this.$store.getters['modules/cart/cartItem'](this.product.upc)
    //   console.log(this.inCart)
    //   clearTimeout(timer)
    // }, 500)
    // console.log(this.$store.state.modules.cart.cart_items)
  },
  methods: {
  }
}
</script>

<style>

</style>
