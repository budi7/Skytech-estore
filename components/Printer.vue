<template>
  <div>
    <div class="printer">
      <slot />
    </div>
    <b-modal id="bv-printer" size="xl" class="printer-canvas" hide-header hide-footer>
      <div class="printer-ui row">
        <div class="col-1 col-md-2 col-lg-4">
          &nbsp;
        </div>
        <div class="col-10 col-md-8 col-lg-4 text-center">
          <h6 class="my-5 pt-5">
            Sedang Mencetak
          </h6>
          <img src="https://media1.tenor.com/images/45b0f1cfc8b1e53d9b3246766efbcec7/tenor.gif?itemid=3527022" class="img-fluid mb-5">
          <b-button @click="print" class="mt-3 btn-sm" variant="outline-primary" block>
            Cetak Lagi
          </b-button>
          <b-button @click="donePrint" class="mt-3 btn-sm" variant="primary" block>
            Selesai
          </b-button>
        </div>
        <div class="col-1 col-md-2 col-lg-4">
          &nbsp;
        </div>
      </div>
      <div class="printer-page">
        <slot />
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    print() {
      this.isVisible = true
      this.$bvModal.show('bv-printer')

      setTimeout(() => {
        window.print()
      }, 750)
    },
    donePrint() {
      this.isVisible = false
      this.$bvModal.hide('bv-printer')
    }
  }

}
</script>

<style>
   #bv-printer .modal-dialog {
    max-width: 100vw !important;
    margin: 0px;
  }

  #bv-printer .modal-dialog > div {
    border-radius: 0px;
    border: none !important;
    min-height: 100vh;
  }

  #bv-printer .printer-page {
    visibility: hidden;
  }

  .print-only {
    display:none;
  }

  @media print {
    #bv-printer .printer-ui {
      visibility: hidden;
      display: none;
    }
    #bv-printer .printer-page {
      visibility: visible;
    }
    body {
      visibility: hidden;
    }
    .print-only {
      display: block;
    }
  }
</style>
