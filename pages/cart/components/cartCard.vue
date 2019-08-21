<template>
  <div
    :class="isLoading ? 'row' : (isAvailable ? 'row clickable cartCard' : 'row comp-disabled') "
    @click="toggleSelection"
  >
    <div class="col-5 col-sm-4 col-md-3 pr-0 py-3">
      <h5 v-show="!isLoading" :class="product.is_selected ? 'fa fa-lg fa-check-circle pr-3' : 'fa fa-lg fa-circle pr-3'" />
      <h5 v-show="isLoading" class="fa fa-lg fa-circle-o-notch fa-spin mr-3" />
      <img
        class="img-fluid img-sm bg-white"
        src="~assets/images/temp1a.png"
      >
    </div>
    <div class="col-7 col-sm-8 col-md-9 pl-1 py-3">
      <p class="mb-0 pt-3">
        <strong>
          {{ product.name }}
        </strong>
      </p>
      <h6 class="pt-2 pb-0 text-darkgray small">
        @ {{ product.price ? (product.price.price - product.price.discount) : 0 | formatPrice }}
      </h6>
      <p v-show="isLoading" class="text-gray small py-1 mb-1">
        Memeriksa ketersediaan barang
      </p>
      <div v-show="!isLoading">
        <p v-show="isError" class="small text-danger py-1 mb-1">
          Ooppss... Terjadi kesalahan!
        </p>
        <div v-show="!isError">
          <p v-show="!isAdjusted || !isAvailable" class="small py-1 mb-1">
            &nbsp;
          </p>
          <p v-show="isAdjusted && isAvailable" class="small text-info py-1 mb-1">
            <i class="fa fa-info-circle fa-lg" /> Jumlah pesanan Anda telah disesuaikan (dari {{ initQty }} barang)
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-5 col-md-4 col-lg-3">
          <div v-show="isLoading">
            <div class="pt-3 pb-3 gradient-animate" />
          </div>
          <div v-show="!isLoading">
            <div v-show="isError">
              <p class="small text-gray">
                Klik untuk mencoba lagi
              </p>
            </div>
            <div v-show="!isError">
              <p v-show="!isAvailable" class="text-danger small mb-1">
                <i class="fa fa-times-circle fa-lg" />
                Maaf, barang tidak tersedia
              </p>
              <ProductQuantity
                v-show="isAvailable"
                v-model="qty"
                :max="available"
              />
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-7 col-md-8 col-lg-9">
          <h6 class="pt-2 pb-3 text-right">
            <small>
              {{ product.is_selected ? totalPrice : 0 | formatPrice }}
            </small>
          </h6>
        </div>
      </div>
    </div>
    <div class="col-12">
      <hr class="light my-0">
    </div>
  </div>
</template>

<script>
import ProductQuantity from '~/components/ProductQuantity'
import apolloCheckStock from '~/gql/shipping/checkStock'

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
      isLoading: false,
      isError: false,
      isAvailable: true,
      isAdjusted: false,
      upc: null,
      qty: 1,
      initQty: 1,
      errors: null,
      modalShow: false,
      totalPrice: 0,
      available: 1000000
    }
  },
  watch: {
    qty(newval, oldval) {
      this.product.qty = this.qty
      this.totalPrice = (this.product.price.price - this.product.price.discount) * this.qty

      // id qty adjusted
      this.isAdjusted = this.initQty !== this.qty
    },
    isLoading(newval, oldval) {
      if (newval === true) this.product.is_selected = false
    },
    'product.is_selected'(newval) {
      if (this.isLoading) this.product.is_selected = false
      if (!this.isAvailable) this.product.is_selected = false
    },
    available(newval) {
      if (newval === 0) {
        this.isAvailable = false
      // } else {
        // this.isAvailable = !(this.qty >= newval)
      }
    }
  },
  created() {
    this.qty = this.product.qty
    this.initQty = this.product.qty
    this.totalPrice = (this.product.price.price - this.product.price.discount) * this.qty
  },
  methods: {
    toggleSelection() {
      if (this.isLoading === false) {
        if (this.isError) {
          this.product.is_selected = false
          this.checkStock()
        } else {
          this.product.is_selected = !this.product.is_selected
        }
      } else {
        this.product.is_selected = false
      }
    },
    checkStock(warehouseId) {
      this.isLoading = true
      this.isError = false

      // check for stock
      this.$apollo.query({
        // Query
        query: apolloCheckStock,

        // Parameters
        variables: {
          products: [this.product.upc],
          warehouse_id: [warehouseId]
        },

        // no cache,
        fetchPolicy: 'no-cache'
      }).then((resp) => {
        // no stock
        if (!resp.data.Stock[0]) {
          this.available = 0
          this.isLoading = false
          return
        }

        // this.available = 0
        this.product.is_selected = true
        this.available = resp.data.Stock[0].available
        this.isLoading = false
        // commit('fetch', resp.data.Stock.data)
        //

        // is adjusted stock
        if (this.available < this.qty) this.qty = this.available
      }).catch((err) => {
        console.log(err)
        this.isError = true
        this.isLoading = false
      })

      // if stock not ok, disable
    }
  }
}
</script>

<style>

</style>
