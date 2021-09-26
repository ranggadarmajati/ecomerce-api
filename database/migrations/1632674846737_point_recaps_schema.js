'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PointRecapsSchema extends Schema {
  up () {
    this.create('point_recaps', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('user_id', 10).unsigned().references('id').inTable('users').notNullable()
      table.integer('order_id', 10).unsigned().references('id').inTable('orders').notNullable()
      table.enum('type', ['in', 'out']).default('in')
      table.timestamps()
    })
  }

  down () {
    this.drop('point_recaps')
  }
}

module.exports = PointRecapsSchema
