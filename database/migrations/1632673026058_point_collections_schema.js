'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PointCollectionsSchema extends Schema {
  up () {
    this.create('point_collections', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('user_id', 10).unsigned().references('id').inTable('users').notNullable()
      table.integer('point').default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('point_collections')
  }
}

module.exports = PointCollectionsSchema
