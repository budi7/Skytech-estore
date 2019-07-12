import gql from 'graphql-tag'

const addCart = gql`mutation addToMyCart (
  $product_code: String,
  $qty: Float
) {
  AddToMyCart (
    product_code: $product_code,
    qty: $qty
  ) {
    user_id,
    product_code,
    qty
  }
}`

export default addCart
