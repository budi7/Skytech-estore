import gql from 'graphql-tag'

const transactions = gql`query SalesOrder(
  $id: Int
) {
  SalesOrder (
    id: $id,
  ) {
    data {
      id,
      no,
      date,
      type,
      store_id,
      store_name,
      store_address,
      store_city,
      store_province,
      store_country,
      store_contact,
      customer_id,
      customer_name,
      customer_address,
      customer_phone,
      customer_email,
      receiver_id,
      receiver_name,
      receiver_address,
      receiver_phone,
      receiver_email,
      courier_name,
      courier_service,
      delivery_to,
      delivery_date,
      payment_method,
      payment_terms,
      invoice_terms,
      shipping_terms,
      note,
      status,
      lines {
        product_name,
        qty,
        price,
        discount,
        additional_discount
      },
      expired_at,
      total
    }
  },
  CheckBillingDetail (
    ref_id: $id,
    ref_type: "SALES_ORDER"
  ){
    tag
    amount
  }
}`

export default transactions
