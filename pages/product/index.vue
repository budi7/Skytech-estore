<template>
  <div>
    <headerBar>
      <nav class="navbar secondary-navbar fixed-top navbar-light main">
        <div class="container top-nav">
          <div class="row ml-0 w-100">
            <div class="col-4 pl-0 pb-1">
              <div v-show="search">
                <i class="fa fa-search" />
              &nbsp;
                {{ search }}
              &nbsp;
                <a href="#" class="mb-1 text-primary" @click="clearSearch">
                  [Hapus Pencarian]
                </a>
              </div>
            </div>
            <div class="col-8 pr-0 pb-1 text-right">
              <a href="javascript:void(0);" class="mb-0 text-gray pr-4" @click="openModalKategori">
                <i class="fa fa-angle-down" />
                {{ kategori ? kategori : 'Semua Kategori' }}
              </a>
              <a href="javascript:void(0);" class="mb-0 text-gray pr-4" @click="openModalBrand">
                <i class="fa fa-angle-down" />
                {{ brand ? brand : 'Semua Merek' }}
              </a>
              <a href="javascript:void(0);" class="mb-0 text-gray pr-4" @click="openModalHarga">
                <i class="fa fa-angle-down" />
                Harga
                <i v-show="price_end || price_start" class="fa fa-check-circle" />
              </a>
              <a href="javascript:void(0);" class="mb-0 text-gray" @click="openModalSorting">
                <i class="fa fa-angle-down" />
                Urutkan
                <i v-show="orderBy" class="fa fa-check-circle" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </headerBar>

    <div class="container after-nav mt-5">
      <div class="row py-4 pl-4">
        <ProductCard v-for="(dt, i) in $store.state.modules.product.products" :key="i" :product="dt" class="mb-3" @tapped="$router.push({ path: '/product/' + dt.id })" />
        <div class="col-12">
          <ProductLoader v-show="isLoading" :n="12" />
        </div>
      </div>
      <div v-if="$store.state.modules.product.product_hasMorePages" v-show="!isLoading" class="row py-4 justify-content-center">
        <div class="col-8 col-sm-6 col-md-4 col-lg-3 ">
          <a href="javascript:void(0);" class="btn btn-outline-primary btn-block mb-5" @click="nextPageProduct()">
            Muat Lebih Banyak
          </a>
        </div>
      </div>
      <div v-if="!$store.state.modules.product.product_hasMorePages && !$store.getters['modules/product/isProductPrefetched']" v-show="!isLoading" class="mb-5 pb-5">
        <displayEmpty
          :is-visible="true"
          :is-actionable="false"
          title="Produk tidak ditemukan"
          msg="Silahkan merubah pencarian Anda"
        />
      </div>
    </div>

    <FooterBar />
    <!-- modals -->
    <no-ssr>
      <b-modal
        id="modal-kategori"
        ref="modal-kategori"
        title="Kategori"
        centered
        hide-footer
        no-close-on-esc
        no-close-on-backdrop
      >
        <div class="row h-min">
          <modalKategori
            ref="modal-content-kategori"
            @selected="kategoriSelected"
          />
        </div>
      </b-modal>

      <b-modal
        id="modal-brand"
        ref="modal-brand"
        title="Merek"
        centered
        hide-footer
        no-close-on-esc
        no-close-on-backdrop
      >
        <div class="row h-min">
          <modalBrand
            ref="modal-content-brand"
            @selected="brandSelected"
          />
        </div>
      </b-modal>

      <b-modal
        id="modal-harga"
        ref="modal-harga"
        title="Filter Harga"
        centered
        hide-footer
        no-close-on-esc
        no-close-on-backdrop
      >
        <div class="row h-min">
          <modalHarga
            ref="modal-content-harga"
            @selected="hargaSelected"
          />
        </div>
      </b-modal>

      <b-modal
        id="modal-sorting"
        ref="modal-sorting"
        title="Urutkan"
        centered
        hide-footer
        no-close-on-esc
        no-close-on-backdrop
      >
        <div class="row h-min">
          <modalSorting
            ref="modal-content-sorting"
            @selected="sortingSelected"
          />
        </div>
      </b-modal>
    </no-ssr>
  </div>
</template>

<script>
// page components
import modalKategori from './components/modalKategori'
import modalSorting from './components/modalSorting'
import modalBrand from './components/modalBrand'
import modalHarga from './components/modalHarga'
import displayEmpty from '~/components/displayEmpty'
import ProductCard from '~/components/ProductCard'
import ProductLoader from '~/components/ProductLoader'
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'

export default {
  components: {
    modalKategori,
    modalSorting,
    modalBrand,
    modalHarga,
    ProductCard,
    ProductLoader,
    displayEmpty,
    HeaderBar,
    FooterBar
  },
  data() {
    return {
      products: [],
      isLoading: true,
      productPage: 1,
      productHasMorePages: true,
      search: null,
      kategori: null,
      kategori_id: null,
      modalKategoriShowState: false,
      orderBy: null,
      orderDesc: null,
      brand: null,
      price_start: null,
      price_end: null
    }
  },
  watch: {
    '$route.query.search'(newval) {
      this.search = newval
    },
    search(newval) {
      this.$store.commit('modules/product/resetProduct')
      const vm = this

      this.$nextTick(() => {
        vm.fetchProduct()
      })
    }
  },
  mounted() {
    // get search
    this.search = this.$route.query.search
    this.kategori = this.$route.query.kategori
    this.kategori_id = this.$route.query.kategori_id
    this.orderBy = this.$route.query.orderBy
    this.orderDesc = this.$route.query.orderBy ? Boolean(this.$route.query.orderDesc) : null
    this.brand = this.$route.query.brand
    this.price_start = this.$route.query.price_start
    this.price_end = this.$route.query.price_end

    if (this.search || this.kategori_id || this.orderBy || this.brand || this.price_start || this.price_end) {
      this.$store.commit('modules/product/resetProduct')
    }

    const vm = this
    const tmr = setTimeout(() => {
      vm.isLoading = false
      vm.$nextTick(() => {
        vm.fetchProduct()
      })
      clearTimeout(tmr)
    }, 500)
  },
  methods: {
    clearSearch() {
      this.search = null
      this.redirectMe()
    },
    redirectMe() {
      let tmp = null

      tmp = {}
      if (this.search) tmp.search = this.search
      if (this.kategori) tmp.kategori = this.kategori
      if (this.kategori_id) tmp.kategori_id = this.kategori_id
      if (this.orderBy) tmp.orderBy = this.orderBy
      if (this.orderDesc) tmp.orderDesc = this.orderDesc
      if (this.brand) tmp.brand = this.brand
      if (this.price_start) tmp.price_start = this.price_start
      if (this.price_end) tmp.price_end = this.price_end

      this.$router.push({
        path: '/product',
        query: tmp
      })
    },
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
          search: this.search,
          kategori: this.kategori_id,
          brand: this.brand,
          price_start: this.price_start,
          price_end: this.price_end,
          sort: {
            orderBy: this.orderBy,
            orderDesc: this.orderDesc
          }
        }
      }).then((res) => {
        vm.isLoading = false
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
        apolloClient: this.$apollo,
        data: {}
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
    openModalKategori() {
      this.$refs['modal-kategori'].show()
      const vm = this
      const tmr = setTimeout(() => {
        vm.$refs['modal-content-kategori'].fetch()
        clearTimeout(tmr)
      }, 100)
    },
    kategoriSelected(dt) {
      this.$refs['modal-kategori'].hide()
      this.kategori = dt ? dt.category : null
      this.kategori_id = dt ? dt.id : null

      // reset irrelevant filter
      // no kategori, no need to reset
      if (dt) {
        this.brand = null
        this.price_start = null
        this.price_end = null
      }

      this.redirectMe()
      this.$store.commit('modules/product/resetProduct')
      this.fetchProduct()
    },
    openModalBrand() {
      this.$refs['modal-brand'].show()
      const vm = this
      const tmr = setTimeout(() => {
        vm.$refs['modal-content-brand'].fetch()
        clearTimeout(tmr)
      }, 100)
    },
    brandSelected(dt) {
      this.$refs['modal-brand'].hide()
      this.brand = dt || null
      this.redirectMe()
      this.$store.commit('modules/product/resetProduct')
      this.fetchProduct()
    },
    openModalHarga() {
      this.$refs['modal-harga'].show()
    },
    hargaSelected(dt) {
      this.$refs['modal-harga'].hide()
      this.price_start = dt.price_start
      this.price_end = dt.price_end
      this.redirectMe()
      this.$store.commit('modules/product/resetProduct')
      this.fetchProduct()
    },
    openModalSorting() {
      this.$refs['modal-sorting'].show()
    },
    sortingSelected(dt) {
      this.$refs['modal-sorting'].hide()
      this.orderBy = dt.orderBy
      this.orderDesc = dt.orderDesc
      this.redirectMe()
      this.$store.commit('modules/product/resetProduct')
      this.fetchProduct()
    }
  }
}
</script>

<style>

</style>
