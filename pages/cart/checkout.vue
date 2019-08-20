<template>
  <div>
    <headerBar />
    <no-ssr>
      <div class="container cart-card after-nav">
        <div class="row">
          <div class="col-12 pt-4 pb-4">
            <h1 class="title">
              Checkout
            </h1>
            <hr>
          </div>
        </div>

        <!-- Pengiriman -->
        <div class="row">
          <div class="col-12">
            <h5 class="mb-3">
              Pengiriman
            </h5>
          </div>
        </div>
        <div class="row">
          <div class="col-6 col-sm-5 col-md-4 col-lg-3 pr-2">
            <div :class="shipping_method === 'deliver_product' ? 'card hover px-3 py-4 active' : 'card hover px-3 py-4'" @click="selectShipment('deliver_product')">
              <p class="mb-0">
                Kirim Barang <i :class="shipping_method === 'deliver_product' ? 'fa fa-lg fa-check-circle pull-right' : 'fa fa-lg fa-circle text-gray pull-right'" />
              </p>
            </div>
          </div>
          <div class="col-6 col-sm-5 col-md-4 col-lg-3 pl-2">
            <div :class="shipping_method === 'pickup_product' ? 'card hover px-3 py-4 active' : 'card hover px-3 py-4'" @click="selectShipment('pickup_product')">
              <p class="mb-0">
                Ambil di Toko <i :class="shipping_method === 'pickup_product' ? 'fa fa-lg fa-check-circle pull-right' : 'fa fa-lg fa-circle text-gray pull-right'" />
              </p>
            </div>
          </div>
        </div>
        <div v-if="shipping_method === 'deliver_product'" class="row mt-5 mb-4">
          <div class="col-6">
            <h5 class="mb-3">
              Alamat Pengiriman
            </h5>
            <p v-if="shipping_address.length !== 0" class="mb-3 text-capitalize">
              <strong>{{ shipping_address.receiver_name }}</strong><br>
              {{ shipping_address.receiver_phone }}<br>
              <span class="small">
                {{ shipping_address.receiver_address.address }}, {{ shipping_address.receiver_address.city }}<br>
                {{ shipping_address.receiver_address.province }}, {{ shipping_address.receiver_address.country }}, {{ shipping_address.receiver_address.zip_code }}
              </span>
            </p>
            <a href="javascript:void(0);" class="text-primary" @click="openAddressModal()">
              {{ shipping_address.length === 0 ? 'Tambahkan Alamat' : 'Ubah Alamat' }} <i :class="shipping_address.length === 0 ? 'fa fa-plus' : 'fa fa-exchange'" />
            </a>
          </div>
          <div class="col-6">
            <h5 class="mb-3">
              Dikirim dari Toko
            </h5>
            <p v-if="shipping_store.length !== 0" class="mb-3 text-capitalize">
              <strong>{{ shipping_store.name }}</strong><br>
              {{ shipping_store.contact }}<br>
              <span class="small">
                {{ shipping_store.address }}, {{ shipping_store.city }}<br>
                {{ shipping_store.province }}, {{ shipping_store.country }}, {{ shipping_store.zip_code }}
              </span>
            </p>
            <a href="javascript:void(0);" :class="shipping_address.length === 0 ? 'disabled' : 'text-primary'" @click="selectShippingStore()">
              {{ shipping_store.length === 0 ? 'Pilih Toko' : 'Ubah Toko' }} <i :class="shipping_store.length === 0 ? 'fa fa-plus' : 'fa fa-exchange'" />
            </a>
            <p v-show="shipping_address.length === 0" class="small text-gray">
              * Silahkan pilih alamat pengiriman terlebih dahulu
            </p>
          </div>
          <!-- <div class="col-12 pt-5">
            <h5 class="mb-3">
              Kurir Pengiriman
            </h5>
            <p v-if="shipping_address.length !== 0" class="mb-3 text-capitalize">
              <strong>{{ shipping_address.receiver_name }}</strong><br>
              {{ shipping_address.receiver_phone }}<br>
              <span class="small">
                {{ shipping_address.receiver_address.address }}, {{ shipping_address.receiver_address.city }}<br>
                {{ shipping_address.receiver_address.province }}, {{ shipping_address.receiver_address.country }}, {{ shipping_address.receiver_address.zip_code }}
              </span>
            </p>
            <a href="javascript:void(0);" :class="shipping_address.length === 0 || shipping_store.length === 0 ? 'disabled' : 'text-primary'" @click="openCourierModal()">
              {{ shipping_courier.length === 0 ? 'Pilih Kurir' : 'Ubah Kurir' }} <i :class="shipping_courier.length === 0 ? 'fa fa-plus' : 'fa fa-exchange'" />
            </a>
            <p v-show="shipping_address.length === 0 || shipping_store.length === 0" class="small text-gray">
              * Silahkan mengisi data alamat pengiriman dan toko terlebih dahulu
            </p>
          </div> -->

          <!-- <div class="col-12 pt-5">
            <h5 class="mb-1">
              Total Ongkos Kirim
            </h5>
            <p v-show="shipping_store.length === 0 || shipping_address.length === 0" class="text-gray small">
              * Silahkan pilih alamat dan toko terlebih dahulu
            </p>
            <div v-show="shipping_store.length !== 0 && shipping_address.length !== 0" class="pt-3">
              <h6 class="mb-3">
                <small>
                  {{ 12346576 | formatPrice }}
                </small>
              </h6>
            </div>
          </div> -->
        </div>
        <div v-if="shipping_method === 'pickup_product'" class="row mt-5 mb-4">
          <div class="col-12">
            <h5 class="mb-3">
              Toko yang Dipilih
            </h5>
            <p v-if="pickup_store.length !== 0" class="mb-3 text-capitalize">
              <strong>{{ pickup_store.name }}</strong><br>
              {{ pickup_store.contact }}<br>
              <span class="small">
                {{ pickup_store.address }}, {{ pickup_store.city }}<br>
                {{ pickup_store.province }}, {{ pickup_store.country }}, {{ pickup_store.zip_code }}
              </span>
            </p>
            <a href="javascript:void(0);" class="text-primary" @click="selectPickupStore">
              {{ pickup_store.length === 0 ? 'Pilih Toko' : 'Ubah Toko' }} <i :class="pickup_store.length === 0 ? 'fa fa-plus' : 'fa fa-exchange'" />
            </a>
          </div>
        </div>
        <div v-show="!shipping_method" class="row mt-5 mb-4">
          <div class="col-12">
            <p class="mb-0 small pl-3 py-5 bg-muted text-center">
              Metode pengiriman barang belum dipilih
            </p>
          </div>
        </div>
        <!-- End of Pengiriman -->

        <!-- Products -->
        <div class="row py-3">
          <div class="col-12">
            <h5 class="mb-3">
              Keranjang Belanja
            </h5>
            <hr>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <a href="javascript:void(0);" class="text-primary" @click="selectAllItem()">
              <i class="fa fa-lg fa-check-circle mr-3" />
              Pilih Semua Produk
            </a>
            <a href="javascript:void(0);" class="text-primary pull-right" @click="fetchStock()">
              <i class="fa fa-lg fa-refresh" />
              Refresh
            </a>
          </div>
          <!-- <div class="col-6 text-right">
            <a href="javascript:void(0);" class="text-danger">
              <i class="fa fa-trash" />
              Hapus Semua
            </a>
          </div> -->
          <div class="col-12">
            <hr class="light mb-0">
          </div>
        </div>
        <div v-for="(dt,i) in products" :key="i">
          <cartCard
            :ref="'list-cart'"
            :product="dt"
          />
        </div>
        <div class="row pb-5 pt-4">
          <div class="col-6 col-sm-6 col-md-7 col-xl-8 text-right">
            <h5><small>Total :</small></h5>
          </div>
          <div class="col-6 col-sm-6 col-md-5 col-xl-4 text-right">
            <h6><small>{{ totalPrice | formatPrice }}</small></h6>
          </div>
        </div>
        <div class="row pb-5 mb-4">
          <div class="col-12 col-sm-6 col-md-7 col-xl-8" />
          <div class="col-12 col-sm-6 col-md-5 col-xl-4 text-right">
            <button class="btn btn-primary btn-block" @click="checkout()">
              Selesaikan Pembayaran
              <i class="fa fa-angle-right" />
            </button>
          </div>
        </div>
        <!-- End of Products -->
      </div>

      <FooterBar />

      <!-- modals -->
      <no-ssr>
        <b-modal
          id="modal-choose-address"
          ref="modal-choose-address"
          title="Pilih Alamat Pengiriman"
          centered
          hide-footer
          no-close-on-esc
          no-close-on-backdrop
        >
          <div class="row h-min">
            <div class="col-12">
              <div class="pt-3">
                <div class="card hover text-center py-4" @click="openNewAddressModal()">
                  <p class="mb-0">
                    <i class="fa fa-plus" />
                    Alamat Baru
                  </p>
                </div>
              </div>

              <listAddress ref="list-address" class="mt-3" @selected="onAddressSelected()" />
            </div>
          </div>
        </b-modal>

        <b-modal
          ref="modal-new-address"
          title="Tambah Alamat Baru"
          centered
          hide-footer
          no-close-on-esc
          no-close-on-backdrop
        >
          <formAddress ref="form-address" @saved="onAddressSaved()" />
        </b-modal>

        <b-modal
          ref="modal-shipping-store"
          title="Pilih Toko"
          centered
          hide-footer
          no-close-on-esc
          no-close-on-backdrop
        >
          <listStore
            ref="list-shipping-store"
            class="h-min"
            @selected="onTokoSelected()"
          />
        </b-modal>

        <b-modal
          ref="modal-pickup-store"
          title="Pilih Toko"
          centered
          hide-footer
          no-close-on-esc
          no-close-on-backdrop
        >
          <listStore
            ref="list-pickup-store"
            class="h-min"
            @selected="onPickUpTokoSelected()"
          />
        </b-modal>

        <b-modal
          ref="modal-finish"
          title=""
          centered
          hide-footer
          no-close-on-esc
          no-close-on-backdrop
          :hide-header-close="is_loading"
        >
          <div v-show="shipping_method === 'deliver_product'">
            <div class="row">
              <div class="col-12">
                <p class="mb-0">
                  <strong>
                    Kurir
                  </strong>
                </p>
                <p class="text-gray small">
                  Pilih kurir pengiriman barang Anda
                </p>
                <div v-show="shipping_courier.length === 0" class="row mt-3 px-2 mb-3">
                  <div class="col-12">
                    <p class="mb-0 small pl-3 py-5 bg-muted text-center">
                      Kurir belum dipilih
                    </p>
                  </div>
                </div>
                <div v-show="shipping_courier.courier_name" class="row mt-3 px-2 mb-3">
                  <div class="col-12 pt-3">
                    <p class="mb-0">
                      {{ shipping_courier.courier_name }} - {{ shipping_courier.courier_service }}
                    </p>
                    <p class="text-gray small mb-0">
                      Estimasi barang akan sampai dalam {{ shipping_courier.etd }}
                    </p>
                  </div>
                </div>
                <div class="row px-2">
                  <div class="col-12 pr-2">
                    <div class="card hover px-3 py-2" @click="selectCourier()">
                      <p class="mb-0 small text-center">
                        {{ shipping_courier.length === 0 ? 'Pilih Kurir' : 'Ubah Kurir' }}<i class="fa fa-lg fa-angle-right" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row pt-3 pb-2">
              <div class="col-12">
                <hr>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <p class="mb-0">
                <strong>
                  Ringkasan Tagihan
                </strong>
              </p>
            </div>
          </div>
          <div class="row pt-3 px-3 pb-3">
            <div class="col-6 col-sm-6 col-md-7 col-lg-8">
              <p class="mb-0">
                Total Belanja
              </p>
              <p class="text-gray small mb-0">
                10 barang
              </p>
            </div>
            <div class="col-6 col-sm-6 col-md-5 col-xl-4 text-right">
              <h6 class="pt-1">
                <small>{{ totalPrice | formatPrice }}</small>
              </h6>
            </div>
          </div>
          <div class="row px-3">
            <div class="col-6 col-sm-6 col-md-7 col-lg-8">
              <p class="mb-0">
                Ongkos Kirim :
              </p>
              <p class="text-gray small mb-0">
                {{ shipping_courier.courier_name ? shipping_courier.courier_name + ' - ' + shipping_courier.courier_service : null }}
              </p>
            </div>
            <div class="col-6 col-sm-6 col-md-5 col-xl-4 text-right">
              <h6 class="pt-1">
                <small>{{ shippingCost | formatPrice }}</small>
              </h6>
            </div>
          </div>
          <div class="row px-2">
            <div class="col-12">
              <hr class="light">
            </div>
          </div>
          <div class="row px-3">
            <div class="col-6 col-sm-6 col-md-7 col-lg-8">
              <p class="mb-0">
                Grand Total :
              </p>
            </div>
            <div class="col-6 col-sm-6 col-md-5 col-xl-4 text-right">
              <h6 class="mb-0">
                <small>{{ grandTotalPrice | formatPrice }}</small>
              </h6>
            </div>
          </div>
          <div class="row pt-3 pb-2">
            <div class="col-12">
              <hr>
            </div>
          </div>
          <div class="row pb-2">
            <div class="col-12">
              <p class="mb-0">
                <strong>
                  Metode Pembayaran
                </strong>
              </p>
              <p class="text-gray small mb-3">
                Pilih pembayaran yang Anda inginkan.
                <i class="fa fa-help" />
              </p>
              <div class="row px-2">
                <div class="col-6 pr-2">
                  <div :class="payment_method === 'offline' ? 'card hover px-3 py-4 active' : 'card hover px-3 py-4'" @click="selectPayment('offline')">
                    <p class="mb-0 small">
                      Bayar di Kasir Skytech<i :class="payment_method === 'offline' ? 'fa fa-lg fa-check-circle pull-right' : 'fa fa-lg text-gray fa-circle pull-right'" />
                    </p>
                    <p class="mb-0 text-gray" style="font-size:.5rem;">
                      &nbsp;
                    </p>
                  </div>
                </div>
                <div class="col-6 pl-2 small">
                  <!-- <div :class="payment_method === 'online' ? 'card hover px-3 py-4 active' : 'card hover px-3 py-4'" @click="selectPayment('online')"> -->
                  <div class="card px-3 py-4 card-disabled">
                    <p class="mb-0">
                      Bayar Online <i :class="payment_method === 'online' ? 'fa fa-lg fa-check-circle pull-right' : 'fa fa-lg fa-circle text-gray pull-right'" />
                    </p>
                    <p class="mb-0" style="font-size:.5rem;">
                      Layanan ini akan segera tersedia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row pt-4">
            <div class="col-12">
              <b-button
                variant="primary"
                block
                type="button"
                :disabled="isAllowedSubmit || is_loading"
                @click="createSO"
              >
                <span v-show="!is_loading">
                  Bayar
                </span>
                <i v-show="is_loading" class="fa fa-circle-o-notch fa-lg fa-spin" />
              </b-button>
            </div>
          </div>
        </b-modal>

        <b-modal
          ref="modal-courier"
          title="Pilih Kurir"
          centered
          hide-footer
          no-close-on-esc
          no-close-on-backdrop
        >
          <listCourier
            ref="list-courier"
            class="h-min"
            @selected="onCourierSelected"
          />
        </b-modal>
      </no-ssr>
      <!-- end of modals -->
    </no-ssr>
  </div>
</template>

<script>
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'
import cartCard from './components/cartCard'
import errorHandler from '../../modules/errorHandler'

import formAddress from './components/formAddress'
import listAddress from './components/listAddress'
import listStore from './components/listStore'
import listCourier from './components/listCourier'

import apolloStoreSo from '~/gql/transaction/createSo'

export default {
  components: {
    HeaderBar,
    FooterBar,
    cartCard,
    formAddress,
    listAddress,
    listStore,
    listCourier
  },
  data() {
    return {
      products: [],
      shipping_method: null,
      shipping_address: [],
      shipping_courier: [],
      shipping_store: [],
      pickup_store: [],
      idx_shipping_store: null,
      idx_pickup_store: null,
      shippingCost: 0,
      payment_method: null,
      is_loading: false
    }
  },
  computed: {
    totalPrice() {
      if (!this.products) return 0

      return this.products.reduce(function (acm, next) {
        let tmp = 0
        if (next.is_selected) tmp = next.qty * (next.price.price - next.price.discount)

        return parseInt(acm) + parseInt(tmp)
      }, 0)
    },
    grandTotalPrice() {
      return this.totalPrice + this.shippingCost
    },
    isAllowedSubmit() {
      // pickup at store
      if (this.shipping_method === 'pickup_product') {
        return this.payment_method === null
      }

      // delivery
      if (this.shipping_courier.amount) {
        return this.payment_method === null
      }

      return true
    }
  },
  watch: {
    // totalPrice(newval) {
    //   // check shipping method
    //   if (this.shipping_method !== 'deliver_product') {
    //     this.shippingCost = 0
    //     return
    //   }

    //   // check products
    //   if (newval === 0) {
    //     this.shippingCost = 0
    //     return
    //   }
    // }
  },
  created() {
    // load cart items
    if (this.$store.state.modules.cart.cart_items) {
      this.products = this.$store.state.modules.cart.cart_items.map(function (data) {
        return {
          'upc': data.upc,
          'medias': data.medias,
          'name': data.name,
          'price': data.price,
          'qty': data.qty,
          'is_selected': true
        }
      })
      console.log(this.$store.state.modules.cart.cart_items)
    } else {
      // go back to cart
      this.$router.push({ path: '/cart' })
      // return
    }
    // future : save current state
  },
  mounted() {
    // load address
    this.$store.commit('modules/address/init')
  },
  methods: {
    // shipment
    selectShipment(val) {
      this.shipping_method = val
    },
    openAddressModal() {
      this.$refs['modal-choose-address'].show()
      setTimeout(() => {
        this.$refs['list-address'].fetch()
      }, 100)
    },
    openNewAddressModal() {
      // this.$refs['modal-choose-address'].hide()
      this.$refs['modal-new-address'].show()
      setTimeout(() => {
        this.$refs['form-address'].init()
      }, 100)
    },
    selectShippingStore() {
      this.$refs['modal-shipping-store'].show()
      setTimeout(() => {
        this.$refs['list-shipping-store'].initSelected(this.idx_shipping_store)
        this.$refs['list-shipping-store'].fetch()
      }, 100)
    },
    selectPickupStore() {
      this.$refs['modal-pickup-store'].show()
      setTimeout(() => {
        this.$refs['list-pickup-store'].initSelected(this.idx_pickup_store)
        this.$refs['list-pickup-store'].fetch()
      }, 100)
    },

    // Products
    selectAllItem(val) {
      this.products = this.products.map(function (data) {
        return {
          'upc': data.upc,
          'medias': data.medias,
          'name': data.name,
          'price': data.price,
          'qty': data.qty,
          'is_selected': true
        }
      })
    },

    // Address
    onAddressSaved() {
      // reload data
      this.shipping_address = this.$store.getters['modules/address/getSelectedAddress']

      // close modal
      this.$refs['modal-new-address'].hide()
      this.$refs['modal-choose-address'].hide()
    },
    onAddressSelected() {
      // reload data
      this.shipping_address = this.$store.getters['modules/address/getSelectedAddress']

      // close modal
      this.$refs['modal-choose-address'].hide()
    },

    // Toko
    onTokoSelected() {
      // reload data
      const tmpToko = this.$store.getters['modules/toko/getSelectedToko']
      this.idx_shipping_store = this.$store.state.modules.toko.selected

      let addr = {}
      if (tmpToko.address) {
        try {
          addr = JSON.parse(tmpToko.address)
          addr.country = addr.country ? addr.country : 'INDONESIA'
        } catch (e) {
          console.log(e)
          addr = {
            country: tmpToko.country ? tmpToko.country : 'INDONESIA',
            address: tmpToko.address,
            city: tmpToko.city,
            province: tmpToko.province,
            zip_code: tmpToko.zip_code
          }
        }
      }

      this.shipping_store = {
        id: tmpToko.id,
        name: tmpToko.name,
        contact: tmpToko.contact,
        address: addr.address,
        province: addr.province,
        country: addr.country,
        city: addr.city,
        zip_code: addr.zip_code
      }

      // close modal
      this.$refs['modal-shipping-store'].hide()

      // this.fetchShippingCost()
      this.fetchStock()
    },
    onPickUpTokoSelected() {
      // reload data
      const tmpToko = this.$store.getters['modules/toko/getSelectedToko']
      this.idx_pickup_store = this.$store.state.modules.toko.selected
      console.log(tmpToko)
      let addr = {}
      if (tmpToko.address) {
        try {
          addr = JSON.parse(tmpToko.address)
          addr.country = addr.country ? addr.country : 'INDONESIA'
        } catch (e) {
          console.log(e)
          addr = {
            country: tmpToko.country ? tmpToko.country : 'INDONESIA',
            address: tmpToko.address,
            city: tmpToko.city,
            province: tmpToko.province,
            zip_code: tmpToko.zip_code
          }
        }
      }

      this.pickup_store = {
        id: tmpToko.id,
        name: tmpToko.name,
        contact: tmpToko.contact,
        address: addr.address,
        province: addr.province,
        country: addr.country,
        city: addr.city,
        zip_code: addr.zip_code
      }

      // close modal
      this.$refs['modal-pickup-store'].hide()

      this.fetchStock()
    },

    // stock
    fetchStock() {
      if (this.$refs['list-cart'].length === 0) {
        this.errors = errorHandler(this, {
          response: null,
          global: true,
          msg: 'Keranjang belanja Anda kosong! Silahkan muat ulang halaman ini',
          debug: null
        })
        return
      }

      // shipping method ?
      if (this.shipping_method === 'deliver_product') {
        // ship
        if (this.shipping_store.length === 0) {
          errorHandler(this, {
            response: null,
            global: true,
            msg: 'Informasi alamat pengiriman atau toko belum diisi',
            debug: null
          })
          return
        }

        this.$refs['list-cart'].forEach((element, idx) => {
          element.checkStock(this.shipping_store.id)
        })
      } else if (this.shipping_method === 'pickup_product') {
        // pick up
        if (this.pickup_store.length === 0) {
          errorHandler(this, {
            response: null,
            global: true,
            msg: 'Informasi toko yang dipilih belum diisi',
            debug: null
          })
          return
        }

        this.$refs['list-cart'].forEach((element, idx) => {
          element.checkStock(this.pickup_store.id)
        })
      } else {
        // undefinied
        errorHandler(this, {
          response: null,
          global: true,
          msg: 'Metode pengiriman belum diisi',
          debug: null
        })
      }
    },

    // Transactions
    checkout() {
      // validations
      // shipping method
      if (this.shipping_method === 'deliver_product') {
        // ship
        if (this.shipping_store.length === 0) {
          errorHandler(this, {
            response: null,
            global: true,
            msg: 'Informasi alamat pengiriman atau toko belum diisi',
            debug: null
          })
          return
        }
      } else if (this.shipping_method === 'pickup_product') {
        if (this.pickup_store.length === 0) {
          errorHandler(this, {
            response: null,
            global: true,
            msg: 'Informasi toko yang dipilih belum diisi',
            debug: null
          })
          return
        }
      } else {
        errorHandler(this, {
          response: null,
          global: true,
          msg: 'Metode pengiriman barang belum dipilih',
          debug: null
        })
        return
      }

      // any products on cart
      if (this.totalPrice <= 0) {
        errorHandler(this, {
          response: null,
          global: true,
          msg: 'Belum ada produk yang dipilih',
          debug: null
        })
        return
      }

      this.shipping_courier = []
      this.shippingCost = 0
      this.payment_method = null

      // checkout
      this.$refs['modal-finish'].show()
    },
    selectPayment(val) {
      this.payment_method = val
    },
    selectCourier() {
      this.$refs['modal-courier'].show()
      const vm = this
      setTimeout(() => {
        vm.$refs['list-courier'].init({
          cart: vm.products,
          address: vm.shipping_address.receiver_address.address ? vm.shipping_address.receiver_address.address + ' ' + vm.shipping_address.receiver_address.city + ' ' + vm.shipping_address.receiver_address.province + ' ' + vm.shipping_address.receiver_address.country + ' ' + vm.shipping_address.receiver_address.zip_code : null,
          store: vm.shipping_store.address ? vm.shipping_store.address + ' ' + vm.shipping_store.city + ' ' + vm.shipping_store.province + ' ' + vm.shipping_store.country + ' ' + vm.shipping_store.zip_code : null
        })
        vm.$refs['list-courier'].fetch()
      }, 100)
    },
    onCourierSelected(dt) {
      this.shipping_courier = dt
      this.shippingCost = dt.amount
      this.$refs['modal-courier'].hide()
    },
    createSO() {
      if (this.is_loading) return
      this.is_loading = true

      // format data
      const inputSO = {}
      const cust = this.$store.state.modules.uac.profile

      inputSO.type = 'ONLINE'
      inputSO.customer_id = this.$store.state.modules.uac.customer_id
      inputSO.customer_name = cust.name
      inputSO.customer_address = cust.address
      inputSO.customer_phone = cust.phone
      inputSO.customer_email = cust.email

      const today = new Date()
      const dd = today.getDate()
      const mm = today.getMonth()
      inputSO.date = today.getFullYear() + '-' + mm + '-' + dd

      if (this.shipping_method === 'pickup_product') {
        // pickup at store
        inputSO.store_id = this.pickup_store.id
        inputSO.store_name = this.pickup_store.name
        // inputSO.store_address = this.pickup_store.address
        inputSO.store_address = JSON.stringify({
          country: this.pickup_store.country ? this.pickup_store.country : 'INDONESIA',
          province: this.pickup_store.province,
          city: this.pickup_store.city,
          address: this.pickup_store.address,
          zip_code: this.pickup_store.zip_code
        })
        inputSO.store_city = this.pickup_store.city
        inputSO.store_province = this.pickup_store.province
        inputSO.store_country = this.pickup_store.country
        inputSO.store_contact = this.pickup_store.contact

        inputSO.courier_name = null
        inputSO.courier_service = null

        inputSO.receiver_id = this.$store.state.modules.uac.customer_id
        inputSO.receiver_name = cust.name
        inputSO.receiver_address = cust.address
        inputSO.receiver_phone = this.$store.state.modules.uac.username
        inputSO.receiver_email = cust.email
      } else {
        // shipping
        inputSO.store_id = this.shipping_store.id
        inputSO.store_name = this.shipping_store.name
        inputSO.store_address = this.shipping_store.address
        inputSO.store_address = JSON.stringify({
          country: this.shipping_store.country ? this.shipping_store.country : 'INDONESIA',
          province: this.shipping_store.province,
          city: this.shipping_store.city,
          address: this.shipping_store.address,
          zip_code: this.shipping_store.zip_code
        })
        inputSO.store_city = this.shipping_store.city
        inputSO.store_province = this.shipping_store.province
        inputSO.store_country = this.shipping_store.country
        inputSO.store_contact = this.shipping_store.contact

        inputSO.courier_name = this.shipping_courier.courier_name
        inputSO.courier_service = this.shipping_courier.courier_service

        inputSO.receiver_id = this.$store.state.modules.uac.customer_id
        inputSO.receiver_name = this.shipping_address.receiver_name
        inputSO.receiver_address = JSON.stringify(this.shipping_address.receiver_address)
        inputSO.receiver_phone = this.shipping_address.receiver_phone
        inputSO.receiver_email = cust.email
      }

      inputSO.lines = this.products
        .filter(dt => dt.is_selected)
        .map((dt) => {
          return {
            product_code: dt.upc,
            qty: dt.qty,
            additional_discount: 0
          }
        })

      // uncertain things goes here
      inputSO.payment_method = this.payment_method === 'online' ? 'BANK_TRANSFER' : 'CASH'
      inputSO.delivery_to = this.shipping_method === 'pickup_product' ? JSON.stringify(this.pickup_store) : cust.address
      inputSO.delivery_date = null

      // fixed
      inputSO.invoice_terms = 'IMMEDIATE'
      inputSO.shipping_terms = this.shipping_method === 'pickup_product' ? 'PICK_AT_STORE' : 'SEND_TO_RECEIVER'
      inputSO.payment_terms = 0

      // console.log(inputSO)

      // post so
      const vm = this
      this.$apollo.mutate({
        // Query
        mutation: apolloStoreSo,

        // Parameters
        variables: inputSO
      }).then((resp) => {
        if (resp.errors) {
          errorHandler(this, {
            response: resp.errors,
            global: true,
            debug: null
          })
        }
        console.log(resp)
        vm.is_loading = false

        // redirect to invoice detail
        this.$router.push({ path: '/me/invoices' })
      }).catch((err) => {
        errorHandler(this, {
          response: err,
          global: true,
          debug: null
        })
        vm.is_loading = false
      })
    }
  }
}
</script>

<style>

</style>
