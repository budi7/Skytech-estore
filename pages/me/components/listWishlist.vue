<template>
  <div class="row clickable cartCard" @click="$router.push({ path: '/product/' + product.id })">
    <div class="col-5 col-sm-4 col-md-3 pr-0 py-3">
      <img
        class="img-fluid img-sm bg-white ml-2"
        src="~assets/images/temp1a.png"
        style="width:65%!important;"
      >
    </div>
    <div class="col-7 col-sm-8 col-md-9 pl-0 pt-2">
      <p class="mb-0 pt-3">
        {{ product.name }}
      </p>
      <h6 class="pt-2 pb-3 text-darkgray small">
        @ {{ product.price ? (product.price.price - product.price.discount) : 0 | formatPrice }}
      </h6>
      <div class="row">
        <div class="col-12 mb-3">
          <b-button variant="primary" class="btn-sm" type="button" :disabled="is_loading" @click.stop="addToCart">
            <i class="fa fa-cart-plus fa-lg" />
            Tambahkan ke Keranjang
          </b-button>
          <b-button variant="outline-primary" class="btn-sm" type="button" :disabled="is_loading" @click.stop="confirmRemove">
            <i class="fa fa-trash fa-lg" />
            Hapus
          </b-button>
        </div>
      </div>
    </div>
    <div class="col-12">
      <hr class="light my-0">
    </div>

    <b-modal
      v-model="modalShow"
      centered
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      :hide-header-close="is_loading"
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 text-center">
            <h4>Hapus Produk?</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-12 pt-4 text-center">
            <p>{{ product.name }} <span class="text-gray"> akan dihapus dari wishlist Anda</span></p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 pt-4 pb-3 text-center">
            <b-button
              variant="primary"
              block
              type="button"
              :disabled="is_loading"
              class="mb-3"
              @click="removeWishlistAddCart"
            >
              Hapus & Tambah ke Cart
            </b-button>
            <b-button
              variant="outline-primary"
              block
              type="button"
              :disabled="is_loading"
              @click="removeWishlist"
            >
              Hapus
            </b-button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import errorHandler from '~/modules/errorHandler'
import alertHandler from '~/modules/alertHandler'
export default {
  props: {
    product: {
      default: function () { return {} },
      type: Object
    }
  },
  data() {
    return {
      is_loading: false,
      modalShow: false
    }
  },
  methods: {
    addToCart() {
      if (this.is_loading) return
      this.is_loading = true

      // dispatch add cart
      this.$store.dispatch('modules/cart/cartItemAdd', {
        apolloClient: this.$apollo,
        data: {
          upc: this.product.upc,
          qty: 1
        }
      }).then((resp) => {
        this.is_loading = false
        alertHandler(this, {
          msg: 'Barang telah ditambahkan kedalam keranjang',
          type: 'success'
        })
      }).catch((err) => {
        this.is_loading = false
        this.errors = errorHandler(this, {
          response: err,
          global: true,
          debug: 'GQL add cart'
        })
      })
    },
    removeWishlist() {
      if (this.is_loading) return
      this.is_loading = true

      // dispatch add cart
      this.$store.dispatch('modules/wishlist/itemRemove', {
        apolloClient: this.$apollo,
        data: {
          upc: this.product.upc
        }
      }).then((resp) => {
        this.is_loading = false
        this.modalShow = false
        alertHandler(this, {
          msg: 'Barang telah dihapus dari wishlist',
          type: 'success'
        })
      }).catch((err) => {
        this.is_loading = false
        this.errors = errorHandler(this, {
          response: err,
          global: true,
          debug: 'GQL remove wishlist'
        })
      })
    },
    removeWishlistAddCart() {
      if (this.is_loading) return
      this.is_loading = true

      // dispatch add cart
      this.$store.dispatch('modules/wishlist/itemRemoveAddCart', {
        apolloClient: this.$apollo,
        data: {
          upc: this.product.upc
        }
      }).then((resp) => {
        this.is_loading = false
        this.modalShow = false
        this.$store.commit('modules/cart/cartUpdate', resp)
        this.$store.commit('modules/cart/countCart')
        this.$store.commit('modules/cart/countCartTotal')
        alertHandler(this, {
          msg: 'Barang telah dihapus dari wishlist dan ditambahkan ke keranjang',
          type: 'success'
        })
      }).catch((err) => {
        this.is_loading = false
        this.errors = errorHandler(this, {
          response: err,
          global: true,
          debug: 'GQL remove wishlist add to cart'
        })
      })
    },
    confirmRemove() {
      this.modalShow = true
    }
  }
}
</script>

<style>

</style>
