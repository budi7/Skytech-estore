<template>
  <div class="input-group mb-3 prod-qty">
    <div class="input-group-prepend">
      <button class="btn btn-sm btn-outline-primary" type="button" @click.stop="minus()">
        <i class="fa fa-minus fa-lg" />
      </button>
    </div>
    <input v-model="ctr" type="text" class="form-control form-control-sm text-center" aria-describedby="basic-addon1" @click.stop>
    <div class="input-group-append">
      <button class="btn btn-sm btn-outline-primary" type="button" @click.stop="add()">
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
    },
    max: {
      default: null,
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
      if (newval === this.max) {
        this.ctr = newval
        return
      }
      if (isNaN(tmp)) {
        this.ctr = 1
        return
      }
      if (tmp < 1) {
        this.ctr = 1
        return
      }
      if (this.max !== null) {
        if (newval > this.max) {
          if (this.max === 0) {
            this.ctr = 0
          } else {
            this.ctr = this.max
          }
        }
        this.$emit('input', this.ctr)
        return
      }

      this.ctr = tmp
      this.$emit('input', this.ctr)
    },
    value(newval) {
      this.ctr = newval
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
    },
    revertData() {
      // revert to previous save data
    }
  }
}
</script>

<style>

</style>
