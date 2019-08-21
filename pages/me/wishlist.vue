<template>
  <div>
    <headerBar />

    <Layout active-index="wishlist">
      <h4 class="mt-3 mb-3">
        Wishlist
      </h4>

      <div v-show="!errors.msg">
        <div v-show="isLoading" class="py-4">
          <div class="pt-5 pb-5 mb-3 gradient-animate" />
          <div class="pt-5 pb-5 mb-3 gradient-animate" />
          <div class="pt-5 pb-5 mb-3 gradient-animate" />
          <div class="pt-5 pb-5 mb-3 gradient-animate" />
          <div class="pt-5 pb-5 mb-3 gradient-animate" />
          <div class="pt-5 pb-5 mb-3 gradient-animate" />
        </div>
        <div v-show="!isLoading">
          <displayEmpty
            title="Wishlist Anda Kosong"
            msg="Untuk melihat wishlist, Anda perlu untuk mulai menambahkan barang yang Anda inginkan kedalam wishlist terlebih dahulu"
            :is-visible="products.length === 0 ? true : false"
            :is-actionable="true"
            action-title="Mulai"
            class="mb-5 pb-5"
            @retry="$router.push({ path: '/product' })"
          />
          <div v-show="products.length > 0" class="row py-4">
            <listWishlist v-for="(product, i) in products" :key="i" :product="product" class="col-12" />
          </div>
        </div>
      </div>

      <displayError
        :msg="errors.msg"
        :is-visible="errors.msg ? true : false"
        class="mb-5 pb-5"
        @retry="fetchWishlist()"
      />
    </Layout>

    <footerBar />
  </div>
</template>

<script>
import Layout from './components/layout'
import HeaderBar from '~/components/HeaderBar'
import errorHandler from '~/modules/errorHandler'
import FooterBar from '~/components/FooterBar'
import displayError from '~/components/displayError'
import displayEmpty from '~/components/displayEmpty'
import listWishlist from './components/listWishlist'

export default {
  components: {
    HeaderBar,
    FooterBar,
    Layout,
    displayError,
    displayEmpty,
    listWishlist
  },
  data() {
    return {
      products: [],
      isLoading: false,
      errors: {
        msg: null,
        data: {}
      }
    }
  },
  created() {
    const vm = this
    this.$nextTick(function () {
      vm.fetchWishlist()
    })
    // const vm = this
    // this.$nextTick(() => {
    // })
  },
  methods: {
    fetchWishlist() {
      if (this.isLoading) return
      this.isLoading = true
      this.errors = {
        msg: null,
        data: {}
      }

      const vm = this
      this.$store.dispatch('modules/wishlist/fetch', {
        apolloClient: this.$apollo,
        data: null
      }).then((res) => {
        vm.isLoading = false
        this.products = this.$store.state.modules.wishlist.wishlist_items
      }).catch((err) => {
        vm.isLoading = false
        this.errors = errorHandler(this, {
          response: err,
          global: true,
          debug: 'Fetch Wishlist'
        })
      })
    }
  }
}
</script>

<style>

</style>
