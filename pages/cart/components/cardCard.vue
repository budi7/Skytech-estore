<template>
  <div>
    <div class="row pt-3">
      <div class="col-4 col-sm-3 col-md-3 col-lg-2 pr-0 py-1">
        <vue-load-image v-if="product.medias.length > 0 && product.medias[0]">
          <img slot="image" :src="product.medias[0] ? formatLink(product.medias[0].url) : '~/assets/images/base.png'" class="img-fluid img-sm bg-white">
          <img slot="preloader" class="img-fluid img-sm bg-white" src="~/assets/images/base.png">
          <img slot="error" class="img-fluid img-sm bg-white" src="~/assets/images/base.png">
        </vue-load-image>
        <img v-else class="img-fluid img-sm bg-white" src="~/assets/images/base.png">
      </div>
      <div class="col pt-3 ls-spacer-l">
        <p class="mb-1 mt-1">
          <strong>
            {{ product.name }}
          </strong>
        </p>
        <p v-show="product.discount" class="mb-0 product-discount">
          {{ product.price ? product.price.price : 0 | formatPrice }}
        </p>
        <p class="mb-0 product-price">
          {{ product.price ? (product.price.price - product.price.discount) : 0 | formatPrice }}
        </p>
        <div class="row pt-3">
          <div class="col-12 col-sm-12 col-md-4">
            <div class="clearfix pt-3" />
          </div>
          <div class="col-12 col-sm-5 col-md-4 col-lg-4 col-xl-3">
            <div class="row">
              <div class="col-2">
                <a @click="modalShow = true" href="javascript:void(0);" class="btn btn-sm btn-outline-danger">
                  <i class="fa fa-trash" />
                </a>
              </div>
              <div class="col-10">
                <ProductQuantity v-model="qty" />
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-7 col-md-4 col-lg-4 col-xl-5 text-right">
            <p v-show="is_loading" class="gradient-animate mb-0 mt-1 pull-right py-3 w-50" />
            <p v-show="!is_loading" class="mb-0 mt-2 total-price">
              {{ product.price ? (product.price.price - product.price.discount) * product.qty : 0 | formatPrice }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <p class="mb-3 text-danger">
              <small>
                {{ errors ? '* ' + (errors['product_code'] ? errors['product_code'][0] : null) : null }}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <hr class="mb-0">
      </div>
    </div>

    <b-modal
      v-model="modalShow"
      :hide-header-close="is_loading"
      centered
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 text-center">
            <h4>Hapus Produk?</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-12 pt-4 text-center">
            <p>{{ product.name }} <span class="text-gray"> akan dihapus dari keranjang belanja Anda</span></p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 pt-4 pb-3 text-center">
            <b-button
              :disabled="is_loading"
              @click="removeCartAddWishlist"
              variant="primary"
              block
              type="button"
              class="mb-3"
            >
              Hapus & Tambah ke Wishlist
            </b-button>
            <b-button
              :disabled="is_loading"
              @click="removeCart"
              variant="outline-primary"
              block
              type="button"
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
import ProductQuantity from '~/components/ProductQuantity'
import errorHandler from '~/modules/errorHandler'
import debounce from '~/modules/debouncer'

export default {
  components: {
    ProductQuantity
  },
  props: {
    product: {
      default: function () { return {} },
      type: Object
    }
  },
  data() {
    return {
      is_loading: true,
      upc: null,
      qty: 1,
      tempQty: 1,
      errors: null,
      modalShow: false
    }
  },
  watch: {
    qty(newval, oldval) {
      // add debouncer
      const vm = this
      debounce(() => {
        vm.updateCart(newval)
      }, 500)
    }
  },
  created() {
    this.qty = this.product.qty
    this.tempQty = this.product.qty
  },
  mounted() {
    const tmr = setTimeout(() => {
      this.is_loading = false
      clearTimeout(tmr)
    }, 300)
  },
  methods: {
    formatLink(link) {
      const tmp = link.split('://')
      if (tmp && tmp.length > 0) {
        return 'https://' + tmp[1]
      } else {
        return link
      }
    },
    updateCart(newval) {
      // can i?
      if (this.is_loading) {
        return
      }

      // set state
      this.is_loading = true
      const vm = this

      // update api
      this.$store.dispatch('modules/cart/cartUpdate', {
        apolloClient: this.$apollo,
        data: {
          upc: this.product.upc,
          qty: newval
        }
      }).then((res) => {
        vm.is_loading = false
        vm.errors = null
        vm.tempQty = vm.qty
      }).catch((err) => {
        vm.errors = errorHandler(vm, {
          response: err,
          global: true,
          debug: 'GQL set cart'
        }).data

        vm.qty = vm.tempQty
        vm.$nextTick(() => {
          vm.is_loading = false
        })
      })
    },
    removeCart() {
      this.updateCart(0)
      this.modalShow = false
    },
    removeCartAddWishlist() {
      // can i?
      if (this.is_loading) {
        return
      }

      // set state
      this.is_loading = true
      const vm = this

      // update api
      this.$store.dispatch('modules/cart/cartRemoveAddWishlist', {
        apolloClient: this.$apollo,
        data: {
          upc: this.product.upc
        }
      }).then((res) => {
        vm.is_loading = false
        vm.errors = null
        vm.modalShow = false
        vm.$store.commit('modules/wishlist/wishlistAdd', res)
      }).catch((err) => {
        vm.errors = errorHandler(vm, {
          response: err,
          global: true,
          debug: 'GQL set cart'
        }).data

        vm.$nextTick(() => {
          vm.modalShow = false
          vm.is_loading = false
        })
      })
    }
  }
}
</script>

<style scoped>
  .img-sm{
    width: 90%;
  }
</style>
