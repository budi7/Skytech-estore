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
