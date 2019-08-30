<template>
  <div class="row">
    <div v-for="(dt,i) in n" :key="i" :class="customClass">
      <div class="card loading card-product mb-4">
        <div class="card-body">
          <div class="gradient-animate loader-image" />
        </div>
        <div class="card-footer p-0 py-1 mb-3">
          <div class="gradient-animate loader-title my-1" />
          <div class="gradient-animate loader-small-title my-1" />
          <div class="gradient-animate loader-subtitle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    n: {
      default: 0,
      type: Number
    },
    customClass: {
      default: 'col-6 col-sm-4 col-md-4 col-lg-3 pl-0 pr-4',
      type: String
    }
  }
}
</script>

<style scoped>
  .loader-image {
    height: 12.5rem;
  }
  .loader-title {
    height: 1.5rem;
  }
  .loader-subtitle {
    height: 1.25rem;
    width: 60%;
  }
  .loader-small-title{
    height: .75rem;
    width: 50%;
  }
</style>
