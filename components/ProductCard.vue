<template>
  <div class="col-6 col-sm-4 col-md-4 col-lg-3 pl-0 pr-4" @click="$emit('tapped')">
    <div class="card card-product mb-4">
      <div class="card-body">
        <img
          class="img-fluid"
          :src="product.medias[0].url"
        >
      </div>
      <div class="card-footer p-0 py-1 mb-3">
        <p class="product-title mt-2 mb-2">
          {{ product.name }}
        </p>
        <p v-show="product.discount" class="mb-0 product-discount">
          {{ product.price ? product.price.price : 0 | formatPrice }}
        </p>
        <p class="mb-0 product-price">
          {{ product.price ? (product.price.price - product.price.discount) : 0 | formatPrice }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
//          :src="product.medias[0].url"

export default {
  props: {
    product: {
      default: function () { return {} },
      type: Object
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style>

</style>
