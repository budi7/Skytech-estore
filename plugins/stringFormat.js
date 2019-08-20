import Vue from 'vue'
import { firstWord } from '../modules/stringFormat'

Vue.filter('firstWord', function (value) {
  return firstWord(value)
})
