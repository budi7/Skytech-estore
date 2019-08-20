import gql from 'graphql-tag'

const addCart = gql`mutation setMyCart (
  $product_code: String,
  $qty: Float
) {
  SetMyCart (
    product_code: $product_code,
    qty: $qty
  ) {
    user_id,
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
