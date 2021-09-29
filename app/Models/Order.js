'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const { v4: uuidv4 } = require('uuid')

class Order extends Model {
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

    point_recaps() {
        return this.hasOne('App/Models/PointRecap')
    }

    user() {
        return this.belongsTo('App/Models/User')
    }

    order_details() {
        return this.hasMany('App/Models/OrderDetail')
    }

    shippings() {
        return this.hasOne('App/Models/Shipping')
    }
}

module.exports = Order
