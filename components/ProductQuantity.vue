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
    qty: {
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
        this.ctr = 0
        return
      }
      if (tmp < 0) {
        this.ctr = 0
        return
      }
      this.ctr = tmp
    }
  },
  mounted() {
    this.ctr = this.qty
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
