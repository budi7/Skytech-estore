<template>
  <div class="col">
    <div class="row">
      <div class="col-12">
        <div
          @click="toggleSelection(null)"
          class="card hover py-3 px-3 mb-3"
        >
          Semua harga
        </div>
      </div>
      <div class="col-12">
        <div
          @click="toggleSelection(0, 999999)"
          class="card hover py-3 px-3 mb-3"
        >
          Kurang dari {{ 1000000 | formatPrice }}
        </div>
      </div>
      <div class="col-12">
        <div
          @click="toggleSelection(1000000, 2999999)"
          class="card hover py-3 px-3 mb-3"
        >
          {{ 1000000 | formatPrice }} hingga {{ 3000000 | formatPrice }}
        </div>
      </div>
      <div class="col-12">
        <div
          @click="toggleSelection(3000000, 5999999)"
          class="card hover py-3 px-3 mb-3"
        >
          {{ 3000000 | formatPrice }} hingga {{ 6000000 | formatPrice }}
        </div>
      </div>
      <div class="col-12">
        <div
          @click="toggleSelection(6000000, 11999999)"
          class="card hover py-3 px-3 mb-3"
        >
          {{ 6000000 | formatPrice }} hingga {{ 12000000 | formatPrice }}
        </div>
      </div>
      <div class="col-12">
        <div
          @click="toggleSelection(12000000, 19999999)"
          class="card hover py-3 px-3 mb-3"
        >
          {{ 12000000 | formatPrice }} hingga {{ 20000000 | formatPrice }}
        </div>
      </div>
      <div class="col-12">
        <div
          @click="toggleSelection(20000000, 0)"
          class="card hover py-3 px-3 mb-3"
        >
          Lebih dari {{ 20000000 | formatPrice }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  methods: {
    toggleSelection(strt, end) {
      this.$emit('selected', {
        price_start: strt,
        price_end: end
      })
    }
  }
}
</script>

<style>

</style>
