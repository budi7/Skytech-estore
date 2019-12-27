<template>
  <div>
    <headerBar />

    <Layout active-index="tagihan_pembelian">
      <h4 class="mt-3 mb-3">
        Tagihan Pembelian
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
            title="Anda Tidak Memiliki Tagihan"
            msg="Mulai belanja di Skytech.id"
            :is-visible="transactions.length === 0 ? true : false"
            :is-actionable="true"
            action-title="Belanja"
            class="mb-5 pb-5"
          />
          <div v-show="transactions.length > 0" class="row py-4">
            <listTransaction
              v-for="(dt, i) in transactions"
              :key="i"
              :transaction="dt"
              url="invoices"
              class="col-12"
            >
              <p class="mb-0 text-gray small">
                Total Tagihan: {{ dt.total | formatPrice }}
              </p>
              <p class="mb-0 small text-gray">
                Kadaluarsa: {{ dt.expired_at | formatDateTime }}
              </p>
            </listTransaction>
          </div>
        </div>
      </div>

      <displayError
        :msg="errors.msg"
        :is-visible="errors.msg ? true : false"
        class="mb-5 pb-5"
        @retry="fetchTransaction()"
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

import apolloTransactions from '~/gql/transaction/transactions'

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
      transactions: [],
      errors: {
        msg: null,
        data: {}
      }
    }
  },
  mounted() {
    this.fetchTransaction()
  },
  methods: {
    fetchTransaction() {
      if (this.isLoading) return
      this.isLoading = true

      this.errors = {
        msg: null,
        data: {}
      }

      this.$apollo.mutate({
        // Query
        mutation: apolloTransactions,

        // Parameters
        variables: {
          customer_id: this.$store.state.modules.uac.customer_id,
          has_status: false,
          order_by: 'updated_at',
          order_desc: false
        }
      }).then((resp) => {
        if (resp.errors) {
          this.isLoading = false
        }
        this.isLoading = false
        this.transactions = resp.data.SalesOrder.data
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
