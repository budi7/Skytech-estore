<template>
  <div class="container cart-card after-nav">
    <div class="row">
      <div class="d-none d-sm-block col-sm-4 col-md-3">
        <div class="card px-2" style="cursor:pointer;">
          <ul class="profile-menu-large">
            <li :class="activeIndex === 'saya' ? 'active' : ''" @click="$router.push({ path: '/me' })">
              <i class="fa fa-user fa-lg" />
              Saya
              <small v-show="!$store.getters['modules/uac/isProfileDataCompleted']">
                <i class="fa fa-asterisk pull-right text-danger" style="padding-top: .3rem;" />
              </small>
            </li>
            <li :class="activeIndex === 'wishlist' ? 'active' : ''" @click="$router.push({ path: '/me/wishlist' })">
              <i class="fa fa-heart-o fa-lg" />
              Wishlist
            </li>
            <li :class="activeIndex === 'tagihan_pembelian' ? 'active' : ''" @click="$router.push({ path: '/me/invoices' })">
              <i class="fa fa-file-text-o fa-lg" />
              Tagihan Pembelian
              <small>
                <i v-show="has_invoice" class="fa fa-asterisk pull-right text-danger" style="padding-top: .3rem;" />
              </small>
            </li>
            <li :class="activeIndex === 'riwayat_pembelian' ? 'active' : ''" @click="$router.push({ path: '/me/transactions' })">
              <i class="fa fa-history fa-lg" />
              Riwayat Pembelian
            </li>
            <li @click="confirmLogout()">
              <i class="fa fa-circle-o-notch fa-lg" />
              Logout
            </li>
          </ul>
        </div>
      </div>
      <div class="d-block d-sm-none pb-3 col-12 pb-4">
        <div @click="openMenu()" class="card hover p-3">
          <div class="row">
            <div class="col-10">
              <p class="mb-0 text-capitalize">
                <span class="fa fa-bars" />
                &nbsp; {{ activeIndex.replace('_', ' ') }}
              </p>
            </div>
            <div class="col-2 text-right">
              <i v-show="has_invoice || !$store.getters['modules/uac/isProfileDataCompleted']" class="fa fa-asterisk pull-right text-danger" style="padding-top: .3rem;" />
            </div>
          </div>
        </div>
      </div>
      <div class="pr-4 d-none d-sm-block" />
      <div class="col">
        <slot />
      </div>
    </div>
    <b-modal
      id="bv-modal-logout"
      ref="modal-logout-confirm"
      centered
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 text-center">
            <h4>Anda Akan Logout</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-12 pt-4 text-center">
            <p>
              Semua data mengenai Anda akan dihapus dari perangkat ini
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 pt-4 pb-3 text-center">
            <a @click="logout()" href="javascript:void(0);" class="btn btn-block btn-primary mb-3">
              Logout Akun Saya
            </a>
            <a @click="$bvModal.hide('bv-modal-logout')" href="javascript:void(0);" class="btn btn-block btn-outline-primary">
              Batal
            </a>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
      id="bv-modal-menu"
      ref="modal-menu"
      centered
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
    >
      <div class="container-fluid mb-4">
        <div class="row">
          <div class="col-12 pb-3 text-center">
            <h4>Menu</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="card px-2" style="cursor:pointer;">
              <ul class="profile-menu-large">
                <li :class="activeIndex === 'saya' ? 'active' : ''" @click="$router.push({ path: '/me' })">
                  <i class="fa fa-user fa-lg" />
                  Saya
                  <small v-show="!$store.getters['modules/uac/isProfileDataCompleted']">
                    <i class="fa fa-asterisk pull-right text-danger" style="padding-top: .3rem;" />
                  </small>
                </li>
                <li :class="activeIndex === 'wishlist' ? 'active' : ''" @click="$router.push({ path: '/me/wishlist' })">
                  <i class="fa fa-heart-o fa-lg" />
                  Wishlist
                </li>
                <li :class="activeIndex === 'tagihan_pembelian' ? 'active' : ''" @click="$router.push({ path: '/me/invoices' })">
                  <i class="fa fa-file-text-o fa-lg" />
                  Tagihan Pembelian
                  <small>
                    <i v-show="has_invoice" class="fa fa-asterisk pull-right text-danger" style="padding-top: .3rem;" />
                  </small>
                </li>
                <li :class="activeIndex === 'riwayat_pembelian' ? 'active' : ''" @click="$router.push({ path: '/me/transactions' })">
                  <i class="fa fa-history fa-lg" />
                  Riwayat Pembelian
                </li>
                <li @click="confirmLogout()">
                  <i class="fa fa-circle-o-notch fa-lg" />
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { logout } from '~/modules/logout'
import apolloTransactions from '~/gql/transaction/transactionsLength'

export default {
  props: {
    activeIndex: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      has_invoice: false
    }
  },
  mounted() {
    this.$apollo.query({
      query: apolloTransactions,

      // Parameters
      variables: {
        customer_id: this.$store.state.modules.uac.customer_id,
        has_status: false
      },

      // no cache
      fetchPolicy: 'no-cache'
    }).then((res) => {
      this.has_invoice = res.data.SalesOrder.total > 0
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    confirmLogout() {
      this.$refs['modal-logout-confirm'].show()
    },
    openMenu() {
      this.$refs['modal-menu'].show()
    },
    logout() {
      this.$refs['modal-logout-confirm'].hide()
      this.$router.replace({ path: '/' })
      const vm = this
      const tmr = setTimeout(() => {
        clearTimeout(tmr)
        logout(vm)
      }, 500)
    }
  }
}
</script>

<style>

</style>
