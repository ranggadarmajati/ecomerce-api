'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const { v4: uuidv4 } = require('uuid')

class ProductCategory extends Model {
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
        })
    }

    category() {
        return this.belongsTo('App/Models/Category', 'category_id', 'id')
    }

    product() {
        return this.belongsTo('App/Models/Product', 'product_id', 'id')
    }
}

module.exports = ProductCategory
