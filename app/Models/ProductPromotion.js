'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const { v4: uuidv4 } = require('uuid')
class ProductPromotion extends Model {
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

    product() {
        return this.belongsTo('App/Models/Product')
    }

    promotion() {
        return this.belongsTo('App/Models/Promotion')
    }
}

module.exports = ProductPromotion
