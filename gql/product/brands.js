import gql from 'graphql-tag'

const query = gql`query Brands(
  $kategori: [Int]
) {
  Brands (
    in_categories: $kategori
  )
}`

export default query
