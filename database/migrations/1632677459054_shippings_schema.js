'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

/**
 * // shippings
Table shippings as s {
  id int [pk, increment]
  uuid varchar [unique]
  order_id int [ref: > o.id]
  logistic varchar [not null]
  package varchar [not null]
  price int
  shipping_discount int [default: 0]
  confirm boolean [default: 0]
  created_at timestamp
  updated_at timestamp
}

// shipping_destinations
Table shipping_destinations as sd {
  id int [pk, increment]
  uuid varchar [unique]
  shipping_id int [ref: > s.id]
  province varchar [not null]
  city varchar [not null]
  district varchar [not null]
  postal_code varchar [not null]
  address text
  recipient varchar [not null]
  mobile_phone varchar [not null]
  created_at timestamp
  updated_at timestamp
}
 */

class ShippingsSchema extends Schema {
  up () {
    this.create('shippings', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('order_id', 10).unsigned().references('id').inTable('orders').notNullable()
      table.string('logistic').notNullable()
      table.string('package').notNullable()
      table.integer('price').notNullable()
      table.integer('shipping_discount').default(0)
      table.boolean('confirm').default(0)
      table.timestamps()
    })

    this.create('shipping_destinations', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('shipping_id', 10).unsigned().references('id').inTable('shippings').notNullable()
      table.string('province').notNullable()
      table.string('city').notNullable()
      table.string('district').notNullable()
      table.string('postal_code').notNullable()
      table.text('address').notNullable()
      table.string('recipient').notNullable()
      table.string('mobile_phone').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('shippings')
    this.drop('shipping_destinations')
  }
}

module.exports = ShippingsSchema
