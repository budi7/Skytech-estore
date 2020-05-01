<template>
  <div class="col">
    <div v-show="!isError">
      <div v-show="isLoading" class="row pl-3">
        <div
          v-for="(dt, i) in 114"
          :key="i"
          class="col-6 pl-0 pr-3 mb-3"
        >
          <div class="gradient-animate pt-5 pb-2" />
        </div>
      </div>
      <div v-show="!isLoading">
        <div class="row pl-3">
          <div
            class="col-12 pl-0"
          >
            <div
              @click="toggleSelection(null)"
              class="card hover py-3 px-3 mb-3"
            >
              Semua Kategori
            </div>
          </div>
          <div
            v-for="(dt, i) in categories"
            :key="i"
            class="col-6 pl-0 pr-3"
          >
            <div
              @click="toggleSelection(dt)"
              class="card hover py-3 px-3 mb-3"
            >
              {{ dt.category }}
            </div>
          </div>
        </div>
      </div>
      <div v-show="isError">
        <displayError
          :is-visible="true"
          @retry="fetch()"
          msg="Tidak dapat memuat kategori"
        />
      </div>
    </div>
  </div>
</template>

<script>
import displayError from '~/components/displayError'

export default {
  components: {
    displayError
  },
  data() {
    return {
      isLoading: true,
      categories: [],
      isError: true
    }
  },
  methods: {
    fetch() {
      this.isLoading = true
      this.isError = false

      this.$store.dispatch('modules/category/fetchCategories', {
        apolloClient: this.$apollo,
        data: null
      }).then((res) => {
        this.categories = res
        this.isLoading = false
        this.isError = false
      }).catch((err) => {
        console.log(err)
        this.isLoading = false
        this.isError = true
      })
    },
    toggleSelection(dt) {
      this.$emit('selected', dt)
    }
  }
}
</script>

<style>

</style>
