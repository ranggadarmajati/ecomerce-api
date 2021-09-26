'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    // create users table
    this.create('users', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.string('name', 40).notNullable()
      table.string('mobile_phone', 20).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
    })

    // create role Schema table
    this.create('roles', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.string('name', 255).notNullable()
      table.string('initial', 50).notNullable()
      table.datetime('deleted_at')
      table.timestamps()
    })

    // create user_roles Schema table
    this.create('user_roles', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('user_id', 10).unsigned().references('id').inTable('users').notNullable()
      table.integer('role_id', 10).unsigned().references('id').inTable('roles').notNullable()
      table.timestamps()
    })

    // create user_verifications Schema table
    this.create('user_verifications', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('user_id', 10).unsigned().references('id').inTable('users').notNullable()
      table.string('token', 255).notNullable()
      table.timestamps()
    })

    // create user address schema table
    this.create('user_addresses', (table) => {
      table.increments()
      table.uuid('uuid').notNullable()
      table.integer('user_id', 10).unsigned().references('id').inTable('users').notNullable()
      table.string('name', 40).notNullable()
      table.text('address').notNullable()
      table.datetime('deleted_at')
      table.timestamps()
    })
  }

  

  down () {
    this.drop('users')
    this.drop('roles')
    this.drop('user_roles')
    this.drop('user_verifications')
    this.drop('user_addresses')
  }
}

module.exports = UserSchema
