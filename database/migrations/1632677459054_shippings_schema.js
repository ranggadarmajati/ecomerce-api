'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

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
