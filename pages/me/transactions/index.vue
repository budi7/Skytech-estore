<template>
  <div>
    <headerBar />

    <Layout active-index="riwayat_pembelian">
      <h4 class="mt-3 mb-3">
        Riwayat Pembelian
      </h4>

      <div v-show="!errors.msg">
        <div v-show="isLoading" class="py-4">
          <div class="pt-5 pb-5 mb-3 gradient-animate" />
          <div class="pt-5 pb-5 mb-3 gradient-animate" />
          <div class="pt-5 pb-5 mb-3 gradient-animate" />
          <div class="pt-5 pb-5 mb-3 gradient-animate" />
          <div class="pt-5 pb-5 mb-3 gradient-animate" />
          <div class="pt-5 pb-5 mb-3 gradient-animate" />
        </div>
        <div v-show="!isLoading">
          <displayEmpty
            :is-visible="invoices.length === 0 ? true : false"
            :is-actionable="true"
            @retry="$router.push({ path: '/product' })"
            title="Belum Ada Data Transaksi"
            msg="Mulai belanja di Skytech.id"
            action-title="Belanja"
            class="mb-5 pb-5"
          />
          <div v-show="invoices.length > 0" class="row py-4">
            <listTransaction
              v-for="(dt, i) in invoices"
              :key="i"
              :transaction="dt"
              class="col-12"
            >
              <p class="mb-0 text-gray small">
                Total Tagihan: {{ dt.total | formatPrice }}
              </p>
              <p v-if="dt.status === 'CONFIRMED'" class="mb-0 small badge badge-info">
                {{ dt.status }}
              </p>
              <p v-if="dt.status === 'CLOSED'" class="mb-0 small badge badge-success">
                {{ dt.status }}
              </p>
            </listTransaction>
          </div>
        </div>
      </div>

      <displayError
        :msg="errors.msg"
        :is-visible="errors.msg ? true : false"
        @retry="fetchInvoice()"
        class="mb-5 pb-5"
      />
    </Layout>

    <footerBar />
  </div>
</template>

<script>
import Layout from '~/pages/me/components/layout'
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'
import errorHandler from '~/modules/errorHandler'
import displayError from '~/components/displayError'
import displayEmpty from '~/components/displayEmpty'
import listTransaction from '~/pages/me/components/listTransaction'

import apolloInvoices from '~/gql/transaction/transactions'

export default {
  components: {
    HeaderBar,
    FooterBar,
    Layout,
    displayError,
    displayEmpty,
    listTransaction
  },
  data() {
    return {
      isLoading: false,
      invoices: [],
      errors: {
        msg: null,
        data: {}
      }
    }
  },
  mounted() {
    this.fetchInvoice()
  },
  methods: {
    fetchInvoice() {
      if (this.isLoading) return
      this.isLoading = true

      this.errors = {
        msg: null,
        data: {}
      }

      this.$apollo.query({
        // Query
        query: apolloInvoices,

        // Parameters
        variables: {
          customer_id: this.$store.state.modules.uac.customer_id,
          statuses: ['CONFIRMED', 'CLOSED'],
          order_by: 'updated_at',
          order_desc: true
        }
      }).then((resp) => {
        if (resp.errors) {
          this.isLoading = false
        }
        this.isLoading = false
        this.invoices = resp.data.SalesOrder.data
      }).catch((err) => {
        this.isLoading = false
        this.errors = errorHandler(this, {
          response: err,
          global: true,
          debug: 'Fetch Wishlist'
        })
      })
    }
  }
}
</script>

<style>

</style>
