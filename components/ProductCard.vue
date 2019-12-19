<template>
  <div class="col-6 col-sm-4 col-md-4 col-lg-3 pl-0 pr-4" @click="$emit('tapped')">
    <div class="card card-product mb-4">
      <div class="card-body">
        <vue-load-image v-if="product.medias.length > 0 && product.medias[0]">
          <div
            slot="image"
            :style="'background-image: url(' + product.medias[0].url + ')'"
            :data-src="product.medias[0].url"
          />
          <img slot="preloader" class="img-fluid" src="~/assets/images/base.png">
          <img slot="error" class="img-fluid" src="~/assets/images/base.png">
        </vue-load-image>
        <img v-else class="img-fluid" src="~/assets/images/base.png">
      </div>
      <div class="card-footer p-0 py-1 mb-3">
        <p class="product-title mt-2 mb-2">
          {{ product.name }}
        </p>
        <p v-show="product.price && product.price.discount" class="mb-0 product-discount">
          {{ product.price ? product.price.price : 0 | formatPrice }}
        </p>
        <p class="mb-0 product-price">
          {{ product.price ? (product.price.price - (product.price && product.price.discount ? product.price.discount : 0)) : 0 | formatPrice }}
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
