<template>
  <div class="row">
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
            title="Data Alamat Kosong"
            msg="Klik tombol tambah alamat baru untuk menambahkan alamat Anda"
            :is-visible="addresses.length === 0 ? true : false"
            :is-actionable="false"
          />
          <div v-show="addresses.length > 0">
            <div
              v-for="(data, i) in addresses"
              :key="i"
              :class="i === $store.state.modules.address.sellectedAddress ? 'card hover active py-3 px-3 mb-3' : 'card hover py-3 px-3 mb-3'"
              @click="selectAddress(i)"
            >
              <p class="mb-0 text-capitalize">
                {{ data.receiver_name }}
                <i :class="i === $store.state.modules.address.sellectedAddress ?'fa fa-lg fa-check-circle pull-right' : 'fa fa-lg fa-circle text-gray pull-right'" />
              </p>
              <p class="mb-1 small">
                {{ data.receiver_phone }}
              </p>
              <p class="mb-0 small text-gray">
                {{ data.receiver_address.address }}, {{ data.receiver_address.city }}<br>
                {{ data.receiver_address.province }}, {{ data.receiver_address.country }}, {{ data.receiver_address.zip_code }}
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
import displayError from '~/components/DisplayError'
import displayEmpty from '~/components/DisplayEmpty'
import errorHandler from '~/modules/errorHandler'

export default {
  components: {
    displayError,
    displayEmpty
  },
  data() {
    return {
      addresses: [],
      is_loading: false,
      errors: {
        msg: null,
        data: {}
      }
    }
  },
  methods: {
    fetch() {
      if (this.is_loading) return

      // reset loading state
      this.is_loading = true

      // reset error state
      this.errors = {
        msg: null,
        data: {}
      }

      // fetch from api
      this.$store.dispatch('modules/address/fetch', {
        apolloClient: this.$apollo,
        data: {}
      }).then((res) => {
        this.is_loading = false
        this.addresses = this.$store.state.modules.address.list
      }).catch((err) => {
        this.is_loading = false
        this.errors = errorHandler(this, {
          response: err,
          global: false,
          debug: 'GQL fetch address'
        })
      })
    },
    selectAddress(dt) {
      this.$store.commit('modules/address/select', dt)
      this.$emit('selected')
    }
  }
}
</script>

<style>

</style>
