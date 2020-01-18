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
              class="card hover py-3 px-3 mb-3"
              @click="toggleSelection(null)"
            >
              Semua Merek
            </div>
          </div>
          <div
            v-for="(dt, i) in brands"
            :key="i"
            class="col-6 pl-0 pr-3"
          >
            <div
              class="card hover py-3 px-3 mb-3"
              @click="toggleSelection(dt)"
            >
              {{ dt }}
            </div>
          </div>
        </div>
      </div>
      <div v-show="isError">
        <displayError
          :is-visible="true"
          msg="Tidak dapat memuat kategori"
          @retry="fetch()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import displayError from '~/components/displayError'
import apolloQueryBrands from '~/gql/product/brands'

export default {
  components: {
    displayError
  },
  data() {
    return {
      isLoading: true,
      categories: [],
      isError: true,
      kategori: this.$route.query.kategori_id || null,
      brands: []
    }
  },
  methods: {
    fetch() {
      this.isLoading = true
      this.isError = false

      this.$apollo.query({
        query: apolloQueryBrands,
        variables: {
          kategori: this.kategori
        }
        // fetchPolicy: 'no-cache'
      }).then((res) => {
        this.brands = res.data.Brands
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
