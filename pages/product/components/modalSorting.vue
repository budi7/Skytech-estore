<template>
  <div class="col">
    <div class="row">
      <div class="col-12">
        <div
          class="card hover py-3 px-3 mb-3"
          @click="toggleSelection('price', false)"
        >
          Harga termurah
        </div>
      </div>

      <div class="col-12">
        <div
          class="card hover py-3 px-3 mb-3"
          @click="toggleSelection('price', true)"
        >
          Harga termahal
        </div>
      </div>

      <div class="col-12">
        <div
          class="card hover py-3 px-3 mb-3"
          @click="toggleSelection('updated_at', true)"
        >
          Produk terbaru
        </div>
      </div>

      <div class="col-12">
        <div
          class="card hover py-3 px-3 mb-3"
          @click="toggleSelection('updated_at', false)"
        >
          Produk terlama
        </div>
      </div>

      <div class="col-12">
        <div
          class="card hover py-3 px-3 mb-3"
          @click="toggleSelection('name', false)"
        >
          Abjad A ke Z
        </div>
      </div>

      <div class="col-12">
        <div
          class="card hover py-3 px-3 mb-3"
          @click="toggleSelection('name', true)"
        >
          Abjad Z ke A
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
    toggleSelection(srt, dsc) {
      this.$emit('selected', {
        orderBy: srt,
        orderDesc: dsc
      })
    }
  }
}
</script>

<style>

</style>
