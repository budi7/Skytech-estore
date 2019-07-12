export function formatNumber(value) {
  if (!value) { return 0 }
  const val = (value / 1).toFixed(0).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
export function formatPrice(value) {
  if (!value) { return 0 }
  const val = (value / 1).toFixed(0).replace('.', ',')
  return 'IDR ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
export function formatFlatNumber(value) {
  if (!value) { return 0 }
  return value.split('.').join('')
}
