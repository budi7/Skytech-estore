<template>
  <div class="row mt-3">
    <div class="col-12">
      <div v-show="!errors.msg">
        <div v-show="is_loading">
          <div class="mb-3 pt-5 pb-5 gradient-animate" />
          <div class="mb-3 pt-5 pb-5 gradient-animate" />
          <div class="mb-3 pt-5 pb-5 gradient-animate" />
          <div class="mb-3 pt-5 pb-5 gradient-animate" />
          <div class="mb-3 pt-5 pb-5 gradient-animate" />
          <div class="mb-3 pt-5 pb-5 gradient-animate" />
          <div class="mb-3 pt-5 pb-5 gradient-animate" />
        </div>
        <div v-show="!is_loading">
          <displayEmpty
            title="Tidak ada Toko"
            msg="Silahkan hubungi Custtomer Service kami untuk bantuan"
            :is-visible="toko.length === 0 ? true : false"
            :is-actionable="false"
          />
          <div v-show="toko.length > 0">
            <cardStoreStock
              v-for="(data, i) in toko"
              :key="i"
              :data="data"
              :is-active="i === selected ? true : false"
              @selected="selectToko(i)"
            />
          </div>
        </div>
      </div>
      <displayError
        :msg="errors.msg"
        :is-visible="errors.msg ? true : false"
        @retry="fetch()"
      />
    </div>
  </div>
</template>

<script>
import cardStoreStock from './cardStoreStock'
import displayError from '~/components/displayError'
import displayEmpty from '~/components/displayEmpty'
import errorHandler from '~/modules/errorHandler'

export default {
  components: {
    cardStoreStock,
    displayError,
    displayEmpty
  },
  props: {
  },
  data() {
    return {
      toko: [],
      is_loading: false,
      errors: {
        msg: null,
        data: {}
      },
      selected: null
    }
  },
  methods: {
    initSelected(dt) {
      this.selected = dt
    },
    fetch() {
      if (this.is_loading) return

      // reset loading state
      this.is_loading = true

      // reset error state
      this.errors = {
        msg: null,
        data: {}
      }

      // any prev data?
      const tmp = ''
      if (tmp.length > 0) {
        this.toko = this.$store.state.modules.toko.list
        return
      }

      // fetch from api
      this.$store.dispatch('modules/toko/fetch', {
        apolloClient: this.$apollo,
        data: {}
      }).then((res) => {
        this.is_loading = false
        this.toko = res
      }).catch((err) => {
        this.is_loading = false
        this.errors = errorHandler(this, {
          response: err,
          global: false,
          debug: 'GQL fetch toko'
        })
      })
    },
    selectToko(dt) {
      this.$store.commit('modules/toko/select', dt)
      this.$emit('selected')
    }
  }
}
</script>

<style>

</style>
