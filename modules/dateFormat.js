export function toString(value) {
  if (!value) { return '' }
  const dd = value.getDate()
  const mm = value.getMonth() + 1
  const yyyy = value.getFullYear()
  return dd + '/' + mm + '/' + yyyy
}
export function fromGMT(value, separator, translateMonth) {
  if (!value) { return '' }
  if (!separator) separator = '/'

  const tmp = new Date(Date.parse(value))

  const dd = tmp.getDate()
  const mm = translateMonth ? getMonthName(tmp.getMonth()) : tmp.getMonth() + 1
  const yyyy = tmp.getFullYear()
  return dd + separator + mm + separator + yyyy
}
export function getMonthName(value) {
  if (!value) { return '' }
  const definition = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  return definition[value]
}
export function fromGMTDateTime(value, separator, translateMonth) {
  if (!value) { return '' }
  if (!separator) separator = '/'

  const tmp = new Date(Date.parse(value))

  const dd = tmp.getDate()
  const mm = translateMonth ? getMonthName(tmp.getMonth()) : tmp.getMonth() + 1
  const yyyy = tmp.getFullYear()
  const hh = ('0' + tmp.getHours()).slice(-2)
  const ii = ('0' + tmp.getMinutes()).slice(-2)
  return '[' + hh + ':' + ii + ']' + separator + dd + separator + mm + separator + yyyy
}
