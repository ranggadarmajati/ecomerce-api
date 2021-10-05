'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.table('categories', (table) => {
      // alter table
      table.string('image_url')
    })
  }

  down () {
    this.table('categories', (table) => {
      // reverse alternations
      table.dropColumn('image_url')
    })
  }
}

module.exports = CategorySchema
