import Vue from 'vue'
import { formatPrice } from '../modules/numberFormat'

Vue.filter('formatPrice', function (value) {
  if (!value) return 'IDR 0'
  return formatPrice(value)
})
