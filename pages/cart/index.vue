<template>
  <div>
    <headerBar />

    <div class="container cart-card after-nav">
      <div class="row">
        <div class="col-12 pt-4 pb-5">
          <h1 class="title">
            Keranjang Saya
          </h1>
        </div>
      </div>
      <div v-show="isLoading">
        <div class="row py-5 mb-5">
          <div class="col-12 my-5 py-5 text-gray text-center">
            <h6>Memuat</h6>
          </div>
        </div>
      </div>
      <div v-show="isLoading === false && isError === true">
        <div class="row py-5 mb-5">
          <div class="col-12 my-5 py-5 text-gray text-center">
            <h6 class="mb-2">
              Tidak dapat memuat data
            </h6>
            <a href="javascript:void(0);" class="btn btn-sm btn-secondary" @click="fetchCart">
              Coba Lagi
            </a>
          </div>
        </div>
      </div>
      <div v-show="isLoading === false && isError === false">
        <NoSsr>
          <div v-show="$store.state.modules.cart.cart_items.length > 0">
            <div v-for="(dt,i) in $store.state.modules.cart.cart_items" :key="i">
              <cardCard :product="dt" />
            </div>
            <div class="row my-3 py-3">
              <div class="col-4 col-sm-3 col-md-3 pr-0 py-1" />
              <div class="col">
                <div class="row">
                  <div class="col-12 col-sm-12 col-md-4" />
                  <div class="col-12 col-sm-5 col-md-4 col-lg-4 col-xl-3">
                    <div class="row">
                      <div class="col-2" />
                      <div class="col-10 text-right">
                        <h6>Total :</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col text-right">
                    <h6>{{ $store.state.modules.cart.cart_total_price | formatPrice }}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="row pt-4 pb-5 d-none d-sm-block">
              <div class="col-12">
                <a href="javascript:void(0);" class="btn btn-outline-primary" @click="$router.push({ path: '/product' })">
                  <i class="fa fa-angle-left" />
                  Belanja Lagi
                </a>
                <a href="javascript:void(0);" class="btn btn-primary pull-right" @click="$router.push({ path: '/cart/checkout' })">
                  Checkout
                  <i class="fa fa-angle-right" />
                </a>
              </div>
            </div>
            <div class="row pt-4 pb-5 d-lg-none d-xl-none d-md-none d-sm-none">
              <div class="col-12 py-3">
                <a href="javascript:void(0);" class="btn btn-block btn-primary mb-3">
                  Checkout
                </a>
                <a href="javascript:void(0);" class="btn btn-block btn-outline-primary">
                  Belanja Lagi
                </a>
              </div>
            </div>
          </div>
          <div v-show="$store.state.modules.cart.cart_items.length === 0">
            <div class="row py-5 mb-5">
              <div class="col-12 my-5 py-5 text-gray text-center">
                <h6 class="mb-2">
                  Keranjang masih kosong
                </h6>
                <a href="javascript:void(0);" class="btn btn-sm btn-secondary" @click="$router.push({ path: '/product' })">
                  Belanja
                  <i class="fa fa-angle-right" />
                </a>
              </div>
            </div>
          </div>
        </NoSsr>
      </div>
    </div>

    <FooterBar />
  </div>
</template>

<script>
import cardCard from './components/cardCard'
import errorHandler from '~/modules/errorHandler'
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'
import { logout } from '~/modules/logout'

export default {
  components: {
    cardCard,
    HeaderBar,
    FooterBar
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.$store.getters['modules/uac/isAuthed']) {
        vm.errors = errorHandler(vm, {
          global: true,
          msg: 'Untuk melihat keranjang, Anda harus login terlebih dahulu',
          debug: 'Fetch Cart'
        })

        // redirect to login
        vm.$router.push({ path: '/uac/login' })
      }
    })
  },
  data() {
    return {
      isLoading: false,
      isError: false,
      carts: []
    }
  },
  created() {
    // this.$store.commit('modules/cart/countCartTotal')
    // this.$store.commit('modules/cart/countCart')
    // this.carts = this.$store.state.modules.cart.cart_items
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchCart()
    })
  },
  methods: {
    fetchCart() {
      // can i?
      if (this.isLoading) return

      // init
      const vm = this
      this.isError = false
      this.isLoading = true

      // fetch products
      this.$store.dispatch('modules/cart/cartFetch', {
        apolloClient: this.$apollo,
        data: null
      }).then((res) => {
        vm.isLoading = false
        vm.isError = false
        vm.carts = res.data
      }).catch((err) => {
        vm.isLoading = false
        vm.isError = true

        if (err.graphQLErrors[0]) {
          if (err.graphQLErrors[0].message === 'Unauthorized') {
            // unauthorized ?
            this.errors = errorHandler(this, {
              global: true,
              msg: 'Maaf, Sesi Anda telah habis',
              debug: 'Fetch Cart'
            })

            // logout
            logout(this)

            // redirect to login
            window.sessionStorage.setItem('pageBeforeLogin', '/cart')
            window.sessionStorage.setItem('pagePrevious', '/')
            this.$router.replace({ path: '/uac/login' })
          } else {
            this.errors = errorHandler(this, {
              response: err,
              global: true,
              debug: 'Fetch Cart'
            })
          }
        } else {
          this.errors = errorHandler(this, {
            response: err,
            global: true,
            debug: 'Fetch Cart'
          })
        }
      })
    },
    updateCart(val) {
      // can i?
      // if (this.isLoading) return

      // console.log(val)

      // set state
      // this.isLoading = true

      // update api
      // this.$store.dispatch('modules/cart/cartUpdate', {
      //   apolloClient: this.$apollo,
      //   data: {
      //     upc: '',
      //     qty: val
      //   }
      // }).then((res) => {
      //   this.isLoading = false
      //   console.log(res)
      // }).catch((err) => {
      //   console.log(err)
      // })
    }
  }
}
</script>

<style>

</style>
