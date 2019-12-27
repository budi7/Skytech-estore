import gql from 'graphql-tag'

const invoices = gql`query Invoices(
  $customer_id: Int,
  $deleted_only: Boolean,
  $status: String,
  $id: Int
) {
  Invoices (
    id: $id,
    customer_id: $customer_id,
    deleted_only: $deleted_only,
    status: $status
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
      delivery_to,
      delivery_date,
      payment_method,
      payment_terms,
      note,
      status,
      lines {
        product_name,
        qty,
        price,
        discount,
        additional_discount
      },
    }
    total
  }
}`

export default invoices
