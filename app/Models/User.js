'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const { v4: uuidv4 } = require('uuid');
/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password & generate uuid before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
      if (!FieldInstance.uuid) {
        FieldInstance.uuid = uuidv4();
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  user_roles() {
    return this.hasOne('App/Models/UserRole', 'id', 'user_id')
  }

  user_addresses() {
    return this.hasMany('App/Models/UserAddress', 'id', 'user_id')
  }

  user_verifications() {
    return this.hasOne('App/Models/UserVerification')
  }

  wishlists() {
    return this.hasMany('App/Models/Wishlist')
  }

  point_collections() {
    return this.hasOne('App/Models/PointCollection')
  }

  point_recaps() {
    return this.hasMany('App/Models/PointRecap')
  }

  orders() {
    return this.hasOne('App/Models/Order')
  }
}

module.exports = User
