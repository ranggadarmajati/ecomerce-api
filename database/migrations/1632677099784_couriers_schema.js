'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CouriersSchema extends Schema {
  up () {
    this.create('couriers', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.string('name', 40).notNullable()
      table.string('initial', 40).notNullable()
      table.string('website', 255).default('#')
      table.string('img_url', 255).notNullable()
      table.boolean('active').default(false)
      table.datetime('deleted_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('couriers')
  }
}

module.exports = CouriersSchema
