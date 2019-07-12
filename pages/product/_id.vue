<template>
  <div>
    <headerBar />

    <div class="container after-nav">
      <div class="row py-4">
        <div class="col-12 col-sm-4">
          <img class="img-fluid" src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/7/21/1326122/1326122_a2463b7f-f0fe-4bb4-93b1-baf3eec797ba_800_800.jpg">
        </div>
        <div class="col-12 col-sm-8 col-md-7 col-xl-6 pt-4">
          <h2 class="mb-3">
            {{ product.name }}
          </h2>
          <p class="text-line text-gray mb-1 small">
            {{ product.price.price | formatPrice }}
          </p>
          <h6>
            {{ (product.price.price - product.price.discount) | formatPrice }}
          </h6>
          <div class="clearfix pt-4" />
          <!-- <a href="javascript:void(0):" class="fa fa-plus-circle fa-2x" /> -->
          <div class="row">
            <div class="col-10 col-sm-5 col-md-4 col-xl-4 pr-0">
              <ProductQuantity />
            </div>
            <div class="col-2 col-sm-2 col-md-2 col-xl-2">
              <a href="javascript:void(0);" class="btn btn-sm btn-block btn-outline-secondary">
                <i class="fa fa-heart-o" />
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
      isPurchasing: false
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
  methods: {
    addToCart(goToCart) {
      // can i?
      if (this.isPurchasing) return

      // check looged in ?

      // dispatch add cart
      this.$store.dispatch('modules/cart/cartItemAdd', {
        apolloClient: this.$apollo,
        data: {
          upc: this.product.upc,
          kuantitas: this.qty
        }
      }).then((res) => {
        this.isPurchasing = false
        // success msg
        console.log(res)

        // go to cart
        if (goToCart) this.$router.push({ path: '/cart' })
      }).catch((err) => {
        this.isPurchasing = false
        // errorHandler(this, err)

        // check if not logged in
        

        console.log(err)
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
    }
  }
}
</script>

<style>

</style>
