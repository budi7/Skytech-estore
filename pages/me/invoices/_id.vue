<template>
  <div>
    <headerBar />

    <Layout active-index="tagihan_pembelian">
      <h4 class="mt-3 mb-1">
        Detail Tagihan Pembelian
      </h4>
      <a href="javascript:void(0);" class="text-primary small" @click="$router.push({ path: '/me/invoices' })">
        <i class="fa fa-angle-left" /> Kembali
      </a>

      <div v-show="isLoading">
        <p class="mb-3 mt-4 pt-3 pb-3 gradient-animate" style="width: 300px;" />

        <hr>

        <p class="mb-3 mt-4">
          <strong>
            Pembayaran
          </strong>
        </p>

        <div class="row">
          <div class="col-6">
            <p class="mb-2">
              Metode Pembayaran
            </p>
            <p class="mb-3 gradient-animate pt-3 pb-2" style="width: 150px;" />
          </div>
          <div class="col-6">
            <p class="mb-2">
              Total Tagihan
            </p>
            <p class="mb-3 gradient-animate pt-3 pb-2" style="width: 150px;" />
          </div>
        </div>

        <div class="row pt-3 pb-3">
          <div class="col-12">
            <div class=" gradient-animate py-5" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <hr>
          </div>
        </div>
        <div class="row pt-3">
          <div class="col-12 col-md-6">
            <p class="mb-3">
              <strong>
                Rincian
              </strong>
            </p>
          </div>
        </div>
        <div class="row pt-3 pb-3">
          <div class="col-12">
            <div class=" gradient-animate py-5" />
          </div>
        </div>
      </div>

      <no-ssr>
        <div v-show="!isLoading">
          <div v-show="!isError">
            <div class="alert my-4 alert-warning">
              <p class="mb-0 small">
                Segera selesaikan pembayaran tagihan Anda sebelum {{ transaction.expired_at | formatDateTime }}
              </p>
            </div>

            <p class="mb-3">
              <strong>
                Tagihan {{ transaction.no }}
              </strong>
            </p>

            <hr>

            <p class="mb-3">
              <strong>
                Pembayaran
              </strong>
            </p>

            <div class="row">
              <div class="col-6">
                <p class="mb-2">
                  Metode Pembayaran
                </p>
                <p class="mb-3 text-gray">
                  {{ transaction.payment_method === 'CASH' ? 'Bayar di kasir' : 'Online' }}
                </p>
              </div>
              <div class="col-6">
                <p class="mb-2">
                  Total Tagihan
                </p>
                <p class="mb-3 text-gray">
                  {{ transaction.total | formatPrice }}
                </p>
              </div>
            </div>

            <div class="row pt-3">
              <div class="col-12 col-md-6">
                <p class="mb-2">
                  Cara Pembayaran
                </p>
                <ol class="text-gray pl-3">
                  <li class="pl-2 mb-2">
                    Datang ke toko Skytech
                  </li>
                  <li class="pl-2 mb-2">
                    Tunjukkan kode pembayaran pada halaman ini kepada kasir
                  </li>
                  <li class="pl-2 mb-2">
                    Kasir akan memindai kode QR pada halaman ini
                  </li>
                  <li class="pl-2 mb-2">
                    Lakukan pembayaran di kasir. Kasir kami akan membantu Anda.
                  </li>
                </ol>
              </div>
              <div class="col-12 col-md-6">
                <div class="card p-3">
                  <p class="small">
                    <strong>
                      Kode Pembayaran
                    </strong>
                  </p>
                  <barcode
                    :value="code"
                    width="1"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <hr>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-12 col-md-6">
                <p class="mb-3">
                  <strong>
                    Rincian
                  </strong>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 px-2">
                <p class="mb-0 text-gray bg-light m-2 py-2 px-2">
                  Pembelelanjaan
                </p>
              </div>
            </div>
            <div v-for="(data,i) in transaction.lines" :key="i" class="row pt-3">
              <div class="col-2 pl-4">
                <p class="mb-0">
                  {{ data.qty }} X
                </p>
              </div>
              <div class="col-7">
                <p class="mb-0">
                  {{ data.product_name }}
                </p>
                <p class="mb-0 text-gray small">
                  {{ (data.price - (data.discount + data.additional_discount)) | formatPrice }}
                </p>
              </div>
              <div class="col-3 pr-4">
                <p class="mb-0 text-right">
                  {{ (data.price - (data.discount + data.additional_discount)) * data.qty | formatPrice }}
                </p>
              </div>
              <div class="col-12">
                <hr class="light mb-0">
              </div>
            </div>
            <div class="row">
              <div class="col-12 px-2">
                <p class="mb-0 text-gray bg-light mx-2 mb-2 py-2 px-2">
                  Biaya Biaya Lain
                </p>
              </div>
            </div>
            <div v-for="(data,i) in transaction.accounts" :key="'a-' + i">
              <div v-if="data.tag.toLowerCase() !== 'total'" class="row pt-3">
                <div class="col-8 pl-4">
                  <p class="mb-0">
                    {{ data.tag.split('_').join(' ') }}
                  </p>
                </div>
                <div class="col-4 pr-4">
                  <p class="mb-0 text-right">
                    {{ data.amount | formatPrice }}
                  </p>
                </div>
                <div class="col-12">
                  <hr class="light mb-0">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6 pl-2 pr-0">
                <p class="mb-0 text-gray bg-light ml-2 mb-2 py-2 pl-2">
                  <strong>
                    Total
                  </strong>
                </p>
              </div>
              <div class="col-6 pr-2 pl-0">
                <p class="mb-0 text-gray bg-light text-right mr-2 mb-2 py-2 pr-2">
                  <strong>
                    {{ transaction.total | formatPrice }}
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <displayError
            :is-visible="isError ? true : false"
            msg="Tidak dapat memuat data"
            class="mb-5 pb-5"
            @retry="fetchTransaction()"
          />
        </div>
      </no-ssr>
    </Layout>

    <footerBar />
  </div>
</template>

<script>
// page components
import Layout from '~/pages/me/components/layout'
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'
import displayError from '~/components/displayError'
import errorHandler from '~/modules/errorHandler'

import apolloTransactions from '~/gql/transaction/transactionDetail'

export default {
  components: {
    Layout,
    HeaderBar,
    FooterBar,
    displayError
  },
  data() {
    return {
      transaction: [],
      isLoading: true,
      isError: false,
      code: null
    }
  },
  created() {
    const vm = this
    this.$nextTick(() => {
      vm.isLoading = false
      vm.fetchTransaction()
    })
  },
  methods: {
    fetchTransaction() {
      if (this.isLoading) return
      this.isLoading = true

      this.isError = false

      this.$apollo.mutate({
        // Query
        mutation: apolloTransactions,

        // Parameters
        variables: {
          id: this.$route.params.id
        }
      }).then((resp) => {
        if (resp.errors) {
          this.isLoading = false
          return
        }

        // empty?
        if (!resp.data.SalesOrder.data[0]) {
          this.isError = true
          this.isLoading = false
          errorHandler(this, {
            response: null,
            msg: 'Data transaksi tidak ditemukan',
            global: true,
            debug: 'Fetch Wishlist'
          })
          this.$router.push({ path: '/me/invoices' })
          return
        }

        this.isLoading = false
        this.transaction = resp.data.SalesOrder.data[0]
        this.additional = resp.data.CheckBillingDetail
        this.code = this.transaction.no
      }).catch((err) => {
        console.log(err)
        this.isLoading = false
        this.isError = true
      })
    }
  }
}
</script>

<style>

</style>
