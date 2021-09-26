'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContentwebSchema extends Schema {
  up () {
    this.create('abouts', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.string('image', 255).notNullable()
      table.string('image_path', 255).notNullable()
      table.string('image_url', 255).notNullable()
      table.text('content').notNullable()
      table.timestamps()
    })

    this.create('banners', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.string('image', 255).notNullable()
      table.string('image_path', 255).notNullable()
      table.string('image_url', 255).notNullable()
      table.string('title', 40).notNullable()
      table.string('description', 255).notNullable()
      table.string('link_url', 255).notNullable()
      table.integer('position', 10).notNullable()
      table.timestamps()
    })

    this.create('contacts', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.string('map_iframe', 255)
      table.float('longitude', 255).notNullable()
      table.float('latitude', 255).notNullable()
      table.text('address')
      table.string('email', 40).default('#')
      table.string('mobile_phone', 40).notNullable()
      table.string('wa_no', 40).default('#')
      table.string('facebook_url', 255).default('#')
      table.string('instagram_url', 255).default('#')
      table.string('youtube_url', 255).default('#')
      table.string('tiktok_url', 255).default('#')
      table.timestamps()
    })

    this.create('faqs', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.string('name', 40).notNullable()
      table.string('description', 255).notNullable()
      table.timestamps()
    })

    this.create('terms_of_uses', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.string('name', 40).notNullable()
      table.string('description', 255).notNullable()
      table.timestamps()
    })

    this.create('privacy_polices', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.string('name', 40).notNullable()
      table.string('description', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('abouts')
    this.drop('banners')
    this.drop('contacts')
    this.drop('faqs')
    this.drop('terms_of_uses')
    this.drop('privacy_polices')
  }
}

module.exports = ContentwebSchema
