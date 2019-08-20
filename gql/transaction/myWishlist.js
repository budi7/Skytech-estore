import gql from 'graphql-tag'

const wishlist = gql`query Wishlist {
  MyWishlist {
    data {
      user_id,
      product_code,
      product {
        id,
        upc,
        name,
        price {
          price,
          discount
        },
        medias{
          id,
          title,
          description,
          url
        }
      }
    }
  }
}`

export default wishlist
