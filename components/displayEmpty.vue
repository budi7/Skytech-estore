<template>
  <div v-show="isVisible" class="row justify-content-center">
    <div class="col-10 col-sm-8 col-md-7 col-xl-6 pt-5 text-center">
      <img src="https://skytech.id/assets/images/empty.png">
      <p class="mt-2 mb-0">
        <strong>
          {{ title }}
        </strong>
      </p>
      <p class="small mb-4">
        {{ msg }}
      </p>
      <button v-if="isActionable" @click="retry()" class="btn btn-secondary btn-sm">
        {{ actionTitle }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: 'Tidak Ada Data',
      type: String
    },
    msg: {
      default: 'Belum ada data tersedia',
      type: String
    },
    isActionable: {
      default: true,
      type: Boolean
    },
    actionTitle: {
      default: 'Belum Ada Judul',
      type: String
    },
    isVisible: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    retry() {
      this.$emit('retry')
    }
  }
}
</script>

<style>

</style>
