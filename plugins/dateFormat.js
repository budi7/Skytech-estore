import Vue from 'vue'
import { fromGMT, fromGMTDateTime } from '../modules/dateFormat'

Vue.filter('formatDate', function (value) {
  if (!value) return ''
  return fromGMT(value, ' ', true)
})

Vue.filter('formatDateTime', function (value) {
  if (!value) return ''
  return fromGMTDateTime(value, ' ', true)
})
