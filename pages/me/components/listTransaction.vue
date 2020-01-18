<template>
  <div class="row clickable cartCard" @click="$router.push({ path: '/me/' + url + '/' + transaction.id })">
    <div class="col-12">
      <div class="row py-3">
        <div class="col-8">
          <p class="mb-1">
            {{ transaction.no }}
          </p>
          <slot />
        </div>
        <div class="col-4 text-right pt-4">
          <p class="text-primary small">
            Detail <i class="fa fa-angle-right" />
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <hr class="light my-0">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transaction: {
      default: function () { return {} },
      type: Object
    },
    url: {
      default: 'transactions',
      type: String
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
