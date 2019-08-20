import Vue from 'vue'

/* ===========================
=            GQL            =
=========================== */
import GQLPropinsi from '@/gql/indonesia/Propinsi.gql'
import GQLKota from '@/gql/indonesia/Kota.gql'
import GQLKecamatan from '@/gql/indonesia/Kecamatan.gql'
/* =====  End of GQL  ====== */

Vue.mixin({
  methods: {
    catchGQLError(err) {
      if (err) {
        if (Array.isArray(err.graphQLErrors) && err.graphQLErrors.length > 0 && Object.keys(err.graphQLErrors[0]).indexOf('message') !== -1) {
          if (err.graphQLErrors[0].message === 'validation') {
            return err.graphQLErrors[0].validation
          } else {
            return err.graphQLErrors[0].message
          }
        } else {
          return err
        }
      }
    },
    APIPropinsi: function (nama) {
      return this.$apollo.query({
        query: GQLPropinsi,
        client: 'indonesia',
        variables: {
          nama: nama
        }
      }).then((res) => {
        return res.data.Propinsi
      }).catch((err) => {
        throw this.catchGQLError(err)
      })
    },
    APIKota: function (nama) {
      return this.$apollo.query({
        query: GQLKota,
        client: 'indonesia',
        variables: {
          nama: nama
        }
      }).then((res) => {
        return res.data.Kota
      }).catch((err) => {
        throw this.catchGQLError(err)
      })
    },
    APIKecamatan: function (nama) {
      return this.$apollo.query({
        query: GQLKecamatan,
        client: 'indonesia',
        variables: {
          nama: nama
        }
      }).then((res) => {
        return res.data.Kecamatan
      }).catch((err) => {
        throw this.catchGQLError(err)
      })
    }
  }
})
