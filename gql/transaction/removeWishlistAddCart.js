import gql from 'graphql-tag'

const removeWIshlist = gql`mutation ToggleWishlist (
  $product_code: String
) {
  ToggleWishlist (
    product_code: $product_code,
    is_add: false
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
  },
  AddToMyCart (
    product_code: $product_code,
    qty: 1
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

export default removeWIshlist
