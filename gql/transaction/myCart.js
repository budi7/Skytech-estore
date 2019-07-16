import gql from 'graphql-tag'

const addCart = gql`query myCart {
  MyCart {
    data {
      product {
        upc,
        name,
        medias {
          url
        },
        price {
          price,
          discount
        }
      }
      qty
    }
  }
}`

export default addCart
