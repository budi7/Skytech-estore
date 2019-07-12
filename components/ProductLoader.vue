<template>
  <div class="row">
    <div v-for="(dt,i) in n" :key="i" class="col-6 col-sm-4 col-md-4 col-lg-3 pl-0 pr-4">
      <div class="card card-product mb-4">
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
  .gradient-animate {
    animation-duration: 1.2s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #fafafa 8%, #f1f1f1 68%, #fafafa 54%);
    background-size: 1000px 640px;
    position: relative;
  }

  @keyframes placeHolderShimmer{
    0%{
      background-position: -468px 0
    }
    100%{
      background-position: 468px 0
    }
  }
</style>
