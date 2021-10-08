'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const { v4: uuidv4 } = require('uuid')

class Product extends Model {
    static boot() {
        super.boot()

        /**
         * A hook to generate uuid before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (FieldInstance) => {
            if (!FieldInstance.uuid) {
                FieldInstance.uuid = uuidv4();
            }
            FieldInstance.slug = FieldInstance.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        })
    }

    product_categories() {
        return this.hasMany('App/Models/ProductCategory')
    }

    product_colors() {
        return this.hasMany('App/Models/ProductColor')
    }

    product_sizes() {
        return this.hasMany('App/Models/ProductSize')
    }

    images() {
        return this.hasMany('App/Models/Image')
    }

    product_measures() {
        return this.hasOne('App/Models/ProductMeasure')
    }

    product_promotions() {
        return this.hasMany('App/Models/ProductPromotion')
    }

    wishlists() {
        return this.hasMany('App/Models/Wishlist')
    }

    order_details() {
        return this.hasMany('App/Models/OrderDetail')
    }

}

module.exports = Product
