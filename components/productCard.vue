<template>
  <div class="col-6 col-sm-4 col-md-4 col-lg-3 pl-0 pr-4" @click="$emit('tapped')">
    <div class="card card-product mb-4">
      <div class="card-body">
        <img
          class="img-fluid"
          src="https://ecs7.tokopedia.net/img/cache/200-square/product-1/2018/7/21/1326122/1326122_a2463b7f-f0fe-4bb4-93b1-baf3eec797ba_800_800.jpg"
        >
      </div>
      <div class="card-footer p-0 py-1 mb-3">
        <p class="product-title mt-2 mb-2">
          {{ product.name }}
        </p>
        <p class="mb-0 product-discount">
          {{ product.price.price | formatPrice }}
        </p>
        <p class="mb-0 product-price">
          {{ (product.price.price - product.price.discount) | formatPrice }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
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
