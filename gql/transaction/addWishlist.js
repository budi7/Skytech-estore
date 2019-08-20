import gql from 'graphql-tag'

const addWishlist = gql`mutation ToggleWishlist (
  $product_code: String,
  $is_add: Boolean
) {
  ToggleWishlist (
    product_code: $product_code,
    is_add: $is_add
  ) {
    product_code,
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

export default addWishlist
