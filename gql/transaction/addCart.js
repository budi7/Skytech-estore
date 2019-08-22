import gql from 'graphql-tag'

const addCart = gql`mutation addToMyCart (
  $product_code: String,
  $qty: Float
) {
  AddToMyCart (
    product_code: $product_code,
    qty: $qty
  ) {
    product_code,
    qty,
    product {
      id,
      upc,
      name,
      medias {
        title,
        url,
      },
      price {
        price,
        discount
      }
    }
  }
}`

export default addCart
