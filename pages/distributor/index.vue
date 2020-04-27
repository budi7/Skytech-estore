<template>
  <div>
    <componentLogo class="mt-4" />

    <form @submit.prevent="login()">
      <h4 class="mb-3 text-center">
        Selamat datang di Skytech.id
      </h4>

      <div class="form-group py-4 text-center">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdck1kf4u96XEtiptimtQnnUOOw27QMHfcnRPNr9MGWUlGW8Q/viewform?usp=sf_link" class="btn btn-block btn-primary">
          Bergabung Sekarang <i class="fa fa-angle-right" />
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import componentLogo from './fragments/logo'

export default {
  layout: 'blankCentered',
  components: {
    componentLogo
  }
}
</script>

<style>

</style>
