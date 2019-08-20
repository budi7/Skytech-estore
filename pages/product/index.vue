<template>
  <div>
    <headerBar>
      <nav class="navbar secondary-navbar fixed-top navbar-light main">
        <div class="container top-nav">
          <div class="row ml-0 w-100">
            <div class="col-4 pl-0 pb-1">
              <i class="fa fa-search" />
              <a href="#" class="mb-1">
                <span class="badge badge-secondary">
                  &nbsp; Apple Iphone X &nbsp;
                  <i class="fa fa-close" />
                </span>
              </a>
            </div>
            <div class="col-8 pr-0 pb-1 text-right">
              <a href="javascript:void(0);" class="mb-0 text-gray pr-4">
                <i class="fa fa-angle-down" />
                Kategori 1
              </a>
              <a href="javascript:void(0);" class="mb-0 text-gray pr-4">
                <i class="fa fa-angle-down" />
                Filter
                <i class="fa fa-check-circle" />
              </a>
              <a href="javascript:void(0);" class="mb-0 text-gray">
                <i class="fa fa-angle-down" />
                Sort
                <i class="fa fa-check-circle" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </headerBar>

    <div class="container after-nav mt-5">
      <div class="row py-4 pl-4">
        <ProductCard v-for="(dt, i) in $store.state.modules.product.products" :key="i" :product="dt" class="mb-3" @tapped="$router.push({ path: '/product/' + dt.id })" />
      </div>
      <ProductLoader v-show="isLoading" :n="12" class="py-4 pl-4" />
      <div v-if="$store.state.modules.product.product_hasMorePages" v-show="!isLoading" class="row py-4 justify-content-center">
        <div class="col-8 col-sm-6 col-md-4 col-lg-3 ">
          <a href="javascript:void(0);" class="btn btn-outline-primary btn-block mb-5" @click="nextPageProduct()">
            Muat Lebih Banyak
          </a>
        </div>
      </div>
    </div>

    <FooterBar />
  </div>
</template>

<script>
// page components
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'
import ProductCard from '~/components/ProductCard'
import ProductLoader from '~/components/ProductLoader'

export default {
  components: {
    HeaderBar,
    FooterBar,
    ProductCard,
    ProductLoader
  },
  data() {
    return {
      products: [],
      isLoading: true,
      productPage: 1,
      productHasMorePages: true
    }
  },
  mounted() {
    const vm = this
    const tmr = setTimeout(() => {
      vm.isLoading = false
      vm.fetchProduct()
      clearTimeout(tmr)
    }, 500)
  },
  methods: {
    fetchProduct() {
      // can i?
      if (this.isLoading) return
      if (this.$store.getters['modules/product/isProductPrefetched']) return

      // init
      const vm = this
      this.isLoading = true

      // fetch products
      this.$store.dispatch('modules/product/initProduct', {
        apolloClient: this.$apollo,
        data: {
          filters: {},
          search: null,
          sort: {
            orderBy: 'updated_at',
            orderDesc: true
          }
        }
      }).then((res) => {
        vm.isLoading = false

        // empty?
        if (res.data.length === 0) {
          // set empty indicator
          console.log('No data')
          // return
        }
      }).catch((err) => {
        vm.isLoading = false
        console.log(err)
      })
    },
    nextPageProduct() {
      // can i?
      if (this.isLoading) return

      // init
      const vm = this
      this.isLoading = true

      // fetch next page
      this.$store.dispatch('modules/product/nextPageProduct', {
        apolloClient: this.$apollo
      }).then((res) => {
        vm.isLoading = false

        // empty?
        if (res.data.length === 0) {
          // set empty indicator
          console.log('No data')
          // return
        }
      }).catch((err) => {
        vm.isLoading = false
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
