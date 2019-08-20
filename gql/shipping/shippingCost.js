import gql from 'graphql-tag'

const shippingCost = gql`query stock($cart: [IShippingLine], $store: String, $address: String) {
  CheckShippingCost (
    lines: $cart,
    store_address: $store
    receiver_address: $address
  ){
    courier_name,
    courier_service,
    amount,
    etd
  }
}`

export default shippingCost
