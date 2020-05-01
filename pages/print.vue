<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <p>No Print</p>
      </div>
      <div class="col-4 text-center">
        <printer ref="printable">
          <h1 class="print-only">
            Print only
          </h1>
          <h3>Print Header</h3>
        </printer>
        <button @click="print" class="btn btn-primary">
          Print
        </button>
      </div>
      <div class="col-4">
        <p>No Print</p>
      </div>
    </div>
  </div>
</template>

<script>

import printer from '~/components/Printer'

export default {
  components: {
    printer
  },
  methods: {
    print() {
      this.$refs.printable.print()
    }
  }
}
</script>

<style>

</style>
