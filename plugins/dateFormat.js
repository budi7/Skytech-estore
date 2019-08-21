import Vue from 'vue'
import { fromGMT } from '../modules/dateFormat'

Vue.filter('formatDate', function (value) {
  if (!value) return ''
  return fromGMT(value, ' ', true)
})
