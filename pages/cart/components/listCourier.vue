<template>
  <div class="row mt-3">
    <div class="col-12">
      <div v-show="!errors.msg">
        <div v-show="is_loading">
          <div class="mb-3 pt-5 pb-5 gradient-animate" />
          <div class="mb-3 pt-5 pb-5 gradient-animate" />
          <div class="mb-3 pt-5 pb-5 gradient-animate" />
          <div class="mb-3 pt-5 pb-5 gradient-animate" />
          <div class="mb-3 pt-5 pb-5 gradient-animate" />
          <div class="mb-3 pt-5 pb-5 gradient-animate" />
          <div class="mb-3 pt-5 pb-5 gradient-animate" />
        </div>
        <div v-show="!is_loading">
          <displayEmpty
            title="Tidak ada Kurir"
            msg="Silahkan hubungi Custtomer Service kami untuk bantuan"
            :is-visible="couriers.length === 0 ? true : false"
            :is-actionable="false"
          />
          <div v-show="couriers.length > 0">
            <div
              v-for="(dt, i) in couriers"
              :key="i"
              class="card hover py-3 px-3 mb-3"
              @click="selectCourier(dt)"
            >
              <p class="mb-0 text-capitalize">
                {{ dt.courier_name }} - {{ dt.courier_service }}
                <i class="fa fa-lg fa-circle text-gray pull-right" />
              </p>
              <p class="mb-1 small">
                Ongkos kirim {{ dt.amount | formatPrice }}
              </p>
              <p class="mb-0 small text-gray">
                Estimasi barang akan sampai dalam {{ dt.etd }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <displayError
        :msg="errors.msg"
        :is-visible="errors.msg ? true : false"
        @retry="fetch()"
      />
    </div>
  </div>
</template>

<script>

import apolloCheckShippingCost from '~/gql/shipping/shippingCost'

import displayError from '~/components/DisplayError'
import displayEmpty from '~/components/DisplayEmpty'
import errorHandler from '~/modules/errorHandler'
// import cardStoreStock from './cardStoreStock'

export default {
  components: {
    displayError,
    displayEmpty
  },
  props: {
  },
  data() {
    return {
      couriers: [],
      is_loading: false,
      errors: {
        msg: null,
        data: {}
      },
      selected: null,
      data: {}
    }
  },
  methods: {
    init(dt) {
      this.data = dt
      this.selected = null
    },
    fetch() {
      if (!this.data) return
      if (this.is_loading) return

      // reset loading state
      this.is_loading = true

      // reset error state
      this.errors = {
        msg: null,
        data: {}
      }

      // parse cart
      let cart = {}
      try {
        cart = this.data.cart.map((dt) => {
          return {
            product_code: dt.upc,
            qty: dt.qty
          }
        })
      } catch (error) {
        console.log(error)
        this.is_loading = false
        this.errors = {
          msg: 'Tidak dapat mendapatkan data kurir',
          data: {}
        }
        return
      }

      // fetch
      // GQLQueryShippingCost
      this.$apollo.query({
        // Query
        query: apolloCheckShippingCost,

        // Parameters
        variables: {
          cart: cart,
          store: this.data.store,
          address: this.data.address
        }
      }).then((resp) => {
        if (resp.errors) {
          this.errors = errorHandler(this, {
            response: resp,
            global: false,
            debug: 'GQL fetch shipping cost'
          })
          return
        }
        this.couriers = resp.data.CheckShippingCost
        this.is_loading = false
      }).catch((err) => {
        this.errors = errorHandler(this, {
          response: err,
          global: false,
          debug: 'GQL fetch shipping cost'
        })
      })
    },
    selectCourier(dt) {
      this.$emit('selected', dt)
    }
  }
}
</script>

<style>

</style>
