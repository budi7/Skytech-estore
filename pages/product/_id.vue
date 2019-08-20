<template>
  <div>
    <headerBar />

    <div class="container after-nav">
      <div class="row py-4">
        <div class="col-12 col-sm-4">
          <!-- <img
            class="img-fluid"
            src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/7/21/1326122/1326122_a2463b7f-f0fe-4bb4-93b1-baf3eec797ba_800_800.jpg"
          > -->
          <img
            class="img-fluid"
            :src="product.medias ? product.medias[0].url : null"
          >
        </div>
        <div class="col-12 col-sm-8 col-md-7 col-xl-6 pt-4 ml-4">
          <h2 class="mb-3">
            {{ product.name }}
          </h2>
          <p class="text-line text-gray mb-1 small">
            {{ product.price ? product.price.price : 0 | formatPrice }}
          </p>
          <h6>
            {{ product.price ? (product.price.price - product.price.discount) : 0 | formatPrice }}
          </h6>
          <div class="clearfix pt-4" />
          <!-- <a href="javascript:void(0):" class="fa fa-plus-circle fa-2x" /> -->
          <div class="row">
            <div class="col-10 col-sm-5 col-md-4 col-xl-4 pr-0">
              <ProductQuantity v-model="qty" />
            </div>
            <div class="col-2 col-sm-2 col-md-2 col-xl-2">
              <a href="javascript:void(0);" class="btn btn-sm btn-block btn-outline-secondary" @click="addWishlist">
                <i class="fa fa-lg fa-heart-o" />
              </a>
            </div>
          </div>
          <div class="row pt-3 mb-1">
            <div class="col-12 col-sm-4 col-md-6 pr-1 mb-3">
              <a href="javascript:void(0);" class="btn btn-sm btn-block btn-primary" @click="addToCart(true)">
                Beli Sekarang
              </a>
            </div>
            <div class="col-12 col-sm-8 col-md-6 pl-1 mb-3">
              <a href="javascript:void(0);" class="btn btn-sm btn-block btn-outline-primary" @click="addToCart()">
                <i class="fa fa-cart-plus fa-lg" /> Tambahkan ke Keranjang
              </a>
            </div>
          </div>
          <!-- <hr>
          <div class="row">
            <div class="col-4 text-center">
              <a href="#" class="text-gray">
                <i class="fa fa-lg fa-heart-o" />
                <span> Wishlist</span>
              </a>
            </div>
            <div class="col-4 text-center">
              <a href="#" class="text-gray">
                <i class="fa fa-lg fa-balance-scale" />
                <span> Bandingkan</span>
              </a>
            </div>
            <div class="col-4 text-center">
              <a href="#" class="text-gray">
                <i class="fa fa-lg fa-share-alt" />
                <span> Bagikan</span>
              </a>
            </div>
          </div>
          <hr> -->
        </div>
      </div>
      <div class="row py-4" />
    </div>

    <FooterBar />
  </div>
</template>

<script>
// page components
import { logout } from '~/modules/logout'
import alertHandler from '~/modules/alertHandler'
import errorHandler from '~/modules/errorHandler'
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'
import ProductQuantity from '~/components/ProductQuantity'

export default {
  components: {
    HeaderBar,
    FooterBar,
    ProductQuantity
  },
  data() {
    return {
      product: [],
      qty: 1,
      isPurchasing: false,
      inCart: null
    }
  },
  asyncData({ app, store, params }) {
    return store.dispatch('modules/product/fetchProductDetail', {
      apolloClient: app.apolloProvider.defaultClient,
      data: {
        id: params.id
      }
    }).then((res) => {
      console.log(res)
      return {
        product: res
      }
    }).catch((err) => {
      console.log(err)
    })
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
    addToCart(goToCart) {
      // can i?
      if (this.isPurchasing) return

      // check looged in ?
      if (!this.$store.getters['modules/uac/isAuthed']) {
        // save current page
        window.sessionStorage.setItem('pageBeforeLogin', '/product/' + this.product.id)

        // display pop up login
        this.errors = errorHandler(this, {
          global: true,
          msg: 'Untuk menambahkan barang, Anda harus login terlebih dahulu',
          debug: 'Fetch Cart'
        })
        this.$router.push({ path: '/uac/login' })
        return
      }

      // dispatch add cart
      this.$store.dispatch('modules/cart/cartItemAdd', {
        apolloClient: this.$apollo,
        data: {
          upc: this.product.upc,
          qty: this.qty
        }
      }).then((res) => {
        this.isPurchasing = false
        // success msg
        alertHandler(this, {
          msg: 'Barang telah ditambahkan kedalam keranjang',
          type: 'success'
        })

        // go to cart
        if (goToCart) this.$router.push({ path: '/cart' })
      }).catch((err) => {
        this.isPurchasing = false

        // check if not logged in
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

            // save current page
            window.sessionStorage.setItem('pageBeforeLogin', '/product/' + this.product.id)

            // reedirect to login
            this.$router.replace({ path: '/uac/login' })
          } else {
            this.errors = errorHandler(this, {
              response: err,
              global: true,
              debug: 'Add Cart'
            })
          }
        } else {
          this.errors = errorHandler(this, {
            response: err,
            global: true,
            debug: 'Add Cart'
          })
        }
      })
    },
    buyNow() {
      // check looged in ?

      // dispatch add cart

      // redirect checkout
    },
    addWishlist() {
      // check looged in ?
      // dispatch add wishlist
      // can i?
      if (this.isPurchasing) return

      // check looged in ?
      if (!this.$store.getters['modules/uac/isAuthed']) {
        // save current page
        window.sessionStorage.setItem('pageBeforeLogin', '/product/' + this.product.id)

        // display pop up login
        this.errors = errorHandler(this, {
          global: true,
          msg: 'Untuk menambahkan barang, Anda harus login terlebih dahulu',
          debug: 'Fetch Cart'
        })
        this.$router.push({ path: '/uac/login' })
        return
      }

      // dispatch add fav items
      this.$store.dispatch('modules/wishlist/itemAdd', {
        apolloClient: this.$apollo,
        data: {
          upc: this.product.upc
        }
      }).then((res) => {
        // success msg
        alertHandler(this, {
          msg: 'Barang telah ditambahkan kedalam wishlist',
          type: 'success'
        })
        console.log(res)
      }).catch((err) => {
        console.log(err)

        // check if not logged in
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

            // save current page
            window.sessionStorage.setItem('pageBeforeLogin', '/product/' + this.product.id)

            // reedirect to login
            this.$router.replace({ path: '/uac/login' })
          } else {
            this.errors = errorHandler(this, {
              response: err,
              global: true,
              debug: 'Add Wishlist'
            })
          }
        } else {
          this.errors = errorHandler(this, {
            response: err,
            global: true,
            debug: 'Add Wishlist'
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
