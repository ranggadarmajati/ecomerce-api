'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PromotionsSchema extends Schema {
  up () {
    this.create('promotions', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.string('name', 40).notNullable()
      table.string('desciption', 255)
      table.enum('promotion_type', ['product_discount', 'shipping_discount'])
      table.enum('discount_type', ['percentage', 'price'])
      table.integer('value')
      table.timestamps()
    })

    this.create('product_promotions', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('product_id').unsigned().references('id').inTable('products').notNullable()
      table.integer('promotion_id').unsigned().references('id').inTable('promotions').notNullable()
      table.datetime('from')
      table.datetime('to')
      table.timestamps()
    })
  }

  down () {
    this.drop('promotions')
    this.drop('product_promotions')
  }
}

module.exports = PromotionsSchema
