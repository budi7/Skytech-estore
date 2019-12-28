<template>
  <div :class="isActive === true ? 'card active hover py-3 px-3 mb-3' : (is_loading === true ? 'card py-3 px-3 mb-3' : 'card hover py-3 px-3 mb-3')" @click="clicked()">
    <div class="row">
      <div ref="parentMap" class="col-12">
        <iframe
          :src="addr"
          frameborder="0"
          style="border:0;Width:100% !important; background-color: #f4f4f4!important;"
          height="120"
        />
      </div>
      <div class="col-12 pt-3">
        <p class="mb-0">
          {{ data.name }}
          <i :class="isActive === true ? 'fa fa-lg fa-check-circle pull-right' : 'fa fa-lg fa-circle text-gray pull-right'" />
        </p>
        <p class="mb-1 small">
          {{ data.contact }}
        </p>
        <p class="mb-0 small text-gray">
          {{ address.address }}, {{ address.city }}<br>
          {{ address.province }}, {{ address.country }}, {{ address.zip_code }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      default: function () { return {} },
      type: Object
    },
    isActive: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      is_loading: false,
      addr: null,
      products: {},
      address: {}
    }
  },
  mounted() {
    // init address
    if (this.data.address) {
      try {
        this.address = JSON.parse(this.data.address)
        this.address.country = this.address.country ? this.address.country : 'INDONESIA'
      } catch (e) {
        console.log(e)
        this.address = {
          country: this.data.address.country ? this.data.address.country : 'INDONESIA',
          address: this.data.address,
          city: this.data.city,
          province: this.data.province,
          zip_code: this.data.zip_code
        }
      }

      // init map
      const tmp = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCDRTbouYUaBoJ0IBSXwxK30MSyHkzVv2E&q='
      const addr = this.data.name + ' ' + this.address.address + ' ' + this.address.city + ' ' + this.address.province + ' ' + this.address.country + ' ' + this.address.zip_code
      this.addr = tmp + addr.replace(/\s/g, '+')
    }

    // setTimeout(() => {
    //   this.is_loading = false
    // }, 2000)

    // const vm = this
    // this.$nextTick(() => {
    //   vm.checkStock()
    // })
  },
  methods: {
    clicked() {
      if (this.is_loading) return
      this.$emit('selected', {
        store: this.store,
        products: this.products
      })
    },
    checkStock() {
      const cart = this.$store.state.modules.cart.cart_items
      if (!cart) return

      const items = cart.map((dt) => {
        return dt.upc
      })

      const vm = this
      this.$store.dispatch('modules/toko/checkStock', {
        apolloClient: this.$apollo,
        data: {
          products: items,
          warehouse_id: this.data.id
        }
      }).then((res) => {
        console.log(res)
        if (!res) return

        vm.products = res.map((dt, idx) => {
          return dt.available
        })

        console.log(vm.products)
        // console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
