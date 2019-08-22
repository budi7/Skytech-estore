import gql from 'graphql-tag'

const removeCart = gql`mutation setMyCart (
  $product_code: String
) {
  SetMyCart (
    product_code: $product_code,
    qty: 0
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
  },
  ToggleWishlist (
    product_code: $product_code,
    is_add: true
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

export default removeCart
