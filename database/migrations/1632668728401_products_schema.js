'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.string('name', 40).unique().notNullable()
      table.string('slug', 255).notNullable()
      table.string('image', 255)
      table.datetime('deleted_at')
      table.timestamps()
    })

    this.create('colors', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.string('name', 40).unique().notNullable()
      table.string('color_code', 40).notNullable()
      table.datetime('deleted_at')
      table.timestamps()
    })

    this.create('products', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.string('name', 255).notNullable()
      table.string('slug', 255).notNullable()
      table.text('description', 255).notNullable()
      table.string('sku', 255)
      table.string('brand', 40)
      table.enum('gender', ['man', 'women', 'unisex'])
      table.integer('capital_price').notNullable()
      table.integer('selling_price').notNullable()
      table.integer('stock').default(0)
      table.integer('point').default(0)
      table.boolean('featured').default(false)
      table.boolean('whoesaler').default(false)
      table.enum('label', ['new', 'favorite', 'best_seller']).default('new')
      table.boolean('publish').default(false)
      table.boolean('someone_buy').default(false)
      table.integer('view').default(0)
      table.datetime('deleted_at')
      table.timestamps()
    })

    this.create('product_categories', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('category_id').unsigned().references('id').inTable('categories').notNullable()
      table.integer('product_id').unsigned().references('id').inTable('categories').notNullable()
      table.timestamps()
    })

    this.create('product_colors', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('color_id').unsigned().references('id').inTable('colors').notNullable()
      table.integer('product_id').unsigned().references('id').inTable('products').notNullable()
      table.integer('additional_price').default(0)
      table.integer('additional_capital_price').default(0)
      table.timestamps()
    })

    this.create('product_sizes', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.string('name').notNullable()
      table.integer('product_id').unsigned().references('id').inTable('products').notNullable()
      table.integer('additional_price').default(0)
      table.integer('additional_capital_price').default(0)
      table.timestamps()
    })

    this.create('images', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('product_id').unsigned().references('id').inTable('products').notNullable()
      table.string('file_name').notNullable()
      table.string('path').notNullable()
      table.string('image_uri').notNullable()
      table.datetime('deleted_at')
      table.timestamps()
    })

    this.create('product_measures', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('product_id').unsigned().references('id').inTable('products').notNullable()
      table.integer('weight').notNullable()
      table.integer('length')
      table.integer('width')
      table.string('weight_uom').default('g')
      table.string('length_uom').default('cm')
      table.string('width_uom').default('cm')
      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
    this.drop('products')
    this.drop('product_categories')
    this.drop('product_colors')
    this.drop('product_sizes')
    this.drop('images')
    this.drop('product_measures')
  }
}

module.exports = ProductsSchema
