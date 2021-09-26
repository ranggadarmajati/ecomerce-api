'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */

const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('user_id', 10).unsigned().references('id').inTable('users').notNullable()
      table.string('order_no', 40).notNullable()
      table.datetime('order_datetime').notNullable()
      table.datetime('order_expired').notNullable()
      table.integer('qty').notNullable()
      table.integer('total_amount').notNullable()
      table.integer('total_product_discount')
      table.integer('total_shipping_discount')
      table.enum('payment_status', ['unpaid', 'paid', 'pending', 'expired']).default('unpaid')
      table.string('payment_method')
      table.datetime('payment_created_time')
      table.datetime('payment_expiry_time')
      table.datetime('payment_time_limit')
      table.timestamps()
    })

    this.create('order_details', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('order_id', 10).unsigned().references('id').inTable('orders').onDelete('cascade').notNullable()
      table.integer('product_id').unsigned().references('id').inTable('products').notNullable()
      table.string('size')
      table.string('color')
      table.integer('qty').notNullable()
      table.integer('capital_price').notNullable()
      table.integer('selling_price').notNullable()
      table.integer('product_discount')
      table.integer('total_price').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
    this.drop('order_details')
  }
}

module.exports = OrdersSchema
