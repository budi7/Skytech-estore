<template>
  <div>
    <headerBar />

    <div class="container after-nav">
      <NoSsr>
        <carousel
          :per-page="1"
          :autoplay="true"
          :loop="true"
          :speed="1000"
          :autoplay-timeout="5000"
          :center-mode="true"
          :pagination-padding="3"
          :pagination-color="'#eaeaea'"
          :pagination-active-color="'#4C3594'"
          :navigation-click-target-size="10"
        >
          <slide>
            <img class="img-fluid" src="https://ecs7.tokopedia.net/img/cache/1190/attachment/2019/6/29/24241914/24241914_2ec284d4-dc7d-4d29-be9b-7f1a695ec35b.jpg">
          </slide>
          <slide>
            <img class="img-fluid" src="https://ecs7.tokopedia.net/img/cache/1190/attachment/2019/6/24/25568798/25568798_3a1c5368-d302-4205-8022-1244c70d4613.jpg">
          </slide>
          <slide>
            <img class="img-fluid" src="https://ecs7.tokopedia.net/img/cache/1190/attachment/2019/7/1/25568798/25568798_2a6e523a-229b-4c92-83fc-676b7b289dc0.png">
          </slide>
        </carousel>
      </NoSsr>

      <div class="row pt-5">
        <div class="col-12 pt-5 pb-3">
          <h1 class="title">
            KATEGORI PRODUK
          </h1>
        </div>
      </div>
      <!-- <div class="row py-3">
        <div class="col-12">

          <carousel
            :per-page="2"
            :autoplay="true"
            :loop="true"
            :speed="1000"
            :autoplay-timeout="5000"
            :center-mode="true"
            :navigation="true"
            :pagination-padding="3"
            :pagination-color="'#eaeaea'"
            :pagination-active-color="'#4C3594'"
            :navigation-click-target-size="10"
          >
            <slide>
              <img class="img-fluid" src="https://ecs7.tokopedia.net/img/cache/1190/attachment/2019/6/29/24241914/24241914_2ec284d4-dc7d-4d29-be9b-7f1a695ec35b.jpg">
            </slide>
            <slide>
              <img class="img-fluid" src="https://ecs7.tokopedia.net/img/cache/1190/attachment/2019/6/24/25568798/25568798_3a1c5368-d302-4205-8022-1244c70d4613.jpg">
            </slide>
            <slide>
              <img class="img-fluid" src="https://ecs7.tokopedia.net/img/cache/1190/attachment/2019/7/1/25568798/25568798_2a6e523a-229b-4c92-83fc-676b7b289dc0.png">
            </slide>
          </carousel>

        </div>
      </div> -->
      <div class="row py-3 pl-3">
        <div v-for="(data, i) in categories" :key="i" class="col-6 col-md-4 col-xl-3 mb-3 pl-0">
          <div class="card-category align-items-center card-group" @click="selectCategory(data)">
            <h3 class="mb-0">
              {{ data.category }}
            </h3>
          </div>
        </div>
      </div>

      <div class="row pt-5">
        <div class="col-12 pt-5 pb-3">
          <h1 class="title">
            PRODUK TERBARU
          </h1>
        </div>
      </div>
      <div class="row py-4 pl-4">
        <ProductCard v-for="(dt, i) in $store.state.modules.product.products" :key="i" :product="dt" @tapped="$router.push({ path: '/product/' + dt.id })" />
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
    </div>
    <footerBar />
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
      categories: [],
      products: [],
      isLoading: true,
      productPage: 1,
      productHasMorePages: true
    }
  },
  asyncData({ app, store, query }) {
    // asyncData(app) {
    // return app.apolloProvider.defaultClient
    //   .query({
    //     query: apolloQueryCategories
    //   }).then((res) => {
    //     console.log(res)
    //     return {
    //       categories: res.data.Categories.data
    //     }
    //   }).catch((err) => {
    //     console.log(err)
    //   })

    // tweakable
    // if (store.state.modules.category.categories.length > 0) {
    //   return {
    //     categories: store.state.modules.category.categories
    //   }
    // }

    // category not showing

    return store.dispatch('modules/category/fetchCategories', {
      apolloClient: app.apolloProvider.defaultClient,
      data: null
    }).then((res) => {
      return {
        categories: res
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  mounted() {
    const vm = this
    const tmr = setTimeout(() => {
      vm.isLoading = false
      vm.fetchProduct()
      clearTimeout(tmr)
    }, 500)

    setTimeout(() => {
      // init ctagery if needed
      if (this.$store.state.modules.category.categories.length === 0) {
        this.$store.commit('modules/category/initStore')
      }
    }, 1000)

    // this.$store.commit('modules/product/resetProduct')
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
        // if (res.data.length === 0) {
        // set empty indicator
        // console.log('No data')
        // return
        // }
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
      }).catch((err) => {
        vm.isLoading = false
        console.log(err)
      })
    },
    selectCategory(ct) {
      this.$router.push({
        path: '/product',
        query: {
          kategori: ct.category,
          kategori_id: ct.id
        }
      })
    }
  }
}
</script>

<style>
.VueCarousel-dot-container {
  margin-top: 0px !important;
  float: right;
}
.VueCarousel-dot {
  margin-top: 7px !important;
}
</style>
