<template>
  <div class="input-group mb-3 prod-qty">
    <div class="input-group-prepend">
      <button class="btn btn-sm btn-outline-primary" type="button" @click="minus()">
        <i class="fa fa-minus fa-lg" />
      </button>
    </div>
    <input v-model="ctr" type="text" class="form-control form-control-sm text-center" aria-describedby="basic-addon1">
    <div class="input-group-append">
      <button class="btn btn-sm btn-outline-primary" type="button" @click="add()">
        <i class="fa fa-plus fa-lg" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      ctr: 0
    }
  },
  watch: {
    ctr(newval, oldval) {
      const tmp = parseInt(newval)
      if (isNaN(tmp)) {
        this.ctr = 1
        return
      }
      if (tmp < 1) {
        this.ctr = 1
        return
      }
      this.ctr = tmp

      this.$emit('input', this.ctr)
    }
  },
  mounted() {
    this.ctr = this.value
  },
  methods: {
    add() {
      this.ctr++
    },
    minus() {
      this.ctr--
    }
  }
}
</script>

<style>

</style>
