<template>
  <div class="col">
    <div class="row">
      <div class="col-12">
        <div
          @click="toggleSelection('price', false)"
          class="card hover py-3 px-3 mb-3"
        >
          Harga termurah
        </div>
      </div>

      <div class="col-12">
        <div
          @click="toggleSelection('price', true)"
          class="card hover py-3 px-3 mb-3"
        >
          Harga termahal
        </div>
      </div>

      <div class="col-12">
        <div
          @click="toggleSelection('updated_at', true)"
          class="card hover py-3 px-3 mb-3"
        >
          Produk terbaru
        </div>
      </div>

      <div class="col-12">
        <div
          @click="toggleSelection('updated_at', false)"
          class="card hover py-3 px-3 mb-3"
        >
          Produk terlama
        </div>
      </div>

      <div class="col-12">
        <div
          @click="toggleSelection('name', false)"
          class="card hover py-3 px-3 mb-3"
        >
          Abjad A ke Z
        </div>
      </div>

      <div class="col-12">
        <div
          @click="toggleSelection('name', true)"
          class="card hover py-3 px-3 mb-3"
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
