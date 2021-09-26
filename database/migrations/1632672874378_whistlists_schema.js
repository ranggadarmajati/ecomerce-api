'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WhistlistsSchema extends Schema {
  up () {
    this.create('whistlists', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('user_id', 10).unsigned().references('id').inTable('users').notNullable()
      table.integer('product_id').unsigned().references('id').inTable('products').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('whistlists')
  }
}

module.exports = WhistlistsSchema
